import cheerio from 'cheerio';
import request from 'request-promise';
import {
  Keyword,
  MonthName,
  monthsByName,
  ScrapedEpisode,
  ScrapedYearDate,
} from '@on-this-day/shared';

enum EpisodeKindsTagIDs {
  EVENTS = 'Events',
  BIRTHS = 'Births',
  DEATHS = 'Deaths',
}

const CITATION_REGEX = /\[citation needed\]|\[\d+\]/gi;

function scrapDescription($: CheerioStatic): string {
  return $('#mw-content-text > div > p')
    .filter((_i: number, element: CheerioElement): boolean => {
      const text = $(element).text();
      return !!text && text.slice(-1) !== ':';
    })
    .map((_i: number, element: CheerioElement) => $(element).text())
    .get()
    .join('\n')
    .replace(CITATION_REGEX, '');
}

function scrapKeywords(
  $: CheerioStatic,
  kw: CheerioElement,
): Keyword | undefined {
  const elementNode = $(kw);
  const title = elementNode.attr('title');
  const href = elementNode.attr('href');

  return title && href ? { title, href } : undefined;
}

function scrapEpisodes(
  $: CheerioStatic,
  episodeKind: EpisodeKindsTagIDs,
): ScrapedEpisode[] {
  const itemToEpisode = (
    _i: number,
    element: CheerioElement,
  ): ScrapedEpisode | undefined => {
    const elementNode = $(element);

    const [year, ...data] = elementNode.text().split(' – ');
    const dataString = data.join(' – ');

    const kw = elementNode
      .children('a')
      .map((_j, keyword) => scrapKeywords($, keyword))
      .get() as [Keyword];

    if (Number.isNaN(+year) || !dataString) {
      return undefined;
    }

    const yearSymbol = year.includes('BC') || year.includes('B.C') ? -1 : 1;

    return {
      year: +year.replace(/\D/g, '') * yearSymbol,
      description: dataString.replace(CITATION_REGEX, ''),
      kw,
    };
  };

  let episodes: ScrapedEpisode[] = [];
  let currentEl = $(`#${episodeKind}`).parent().next();
  do {
    const tagName = currentEl.prop('tagName');

    // Reached next episodes kind
    if (tagName !== 'UL' && tagName !== 'H3') break;

    // Sub-calendar
    if (tagName === 'H3') continue;

    episodes = episodes.concat(
      currentEl
        .children('li')
        .map(itemToEpisode)
        .filter((episode) => !!episode)
        .get() as ScrapedEpisode[],
    );
  } while ((currentEl = currentEl.next()));

  return episodes;
}

function scrape(htmlBody: string): ScrapedYearDate {
  const $ = cheerio.load(htmlBody);

  return {
    description: scrapDescription($),
    events: scrapEpisodes($, EpisodeKindsTagIDs.EVENTS),
    births: scrapEpisodes($, EpisodeKindsTagIDs.BIRTHS),
    deaths: scrapEpisodes($, EpisodeKindsTagIDs.DEATHS),
  };
}

export default async function scrapeYearDate(
  monthName: MonthName,
  dayOfMonth: number,
  delay: number,
): Promise<ScrapedYearDate> {
  if (dayOfMonth < 1 || dayOfMonth > monthsByName[monthName].days) {
    throw new Error(`Day ${dayOfMonth} is not valid for month ${monthName}`);
  }

  const html = await request(
    `https://en.wikipedia.org/wiki/${monthName}_${dayOfMonth}`,
  );
  await new Promise((resolve) => setTimeout(resolve, delay));
  return scrape(html);
}
