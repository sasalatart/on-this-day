import Bluebird from 'bluebird';
import {
  buildProgressBar,
  EpisodeKind,
  MONTHS_NUMBERS_BY_NAME,
  MONTHS,
  ScrapedEpisode,
  ScrapedYearDate,
} from '@on-this-day/shared';
import {
  EpisodeDocument,
  EpisodeModel,
  YearDateDocument,
  YearDateModel,
} from '../../models';
import { SeedData } from './types';

async function createYearDate(
  formattedDate: string,
  scrapedYearDate: ScrapedYearDate,
  yearDateModel: YearDateModel,
  episodeModel: EpisodeModel,
): Promise<YearDateDocument | undefined> {
  const [monthName, day] = formattedDate.split('-');
  const { description, events, births, deaths } = scrapedYearDate;
  const dayMonthData = { day, month: MONTHS_NUMBERS_BY_NAME[monthName] };

  const yearDate = await yearDateModel.create({ ...dayMonthData, description });

  async function createOfKind(
    episodes: ScrapedEpisode[],
    kind: EpisodeKind,
  ): Promise<EpisodeDocument['_id'][]> {
    const createdEpisodes = await episodeModel.create(
      episodes.map((scrapedEpisode) => ({
        ...dayMonthData,
        ...scrapedEpisode,
        keywords: scrapedEpisode.kw,
        yearDate: yearDate._id,
        kind,
      })),
    );
    return (createdEpisodes || []).map(({ _id }) => _id);
  }

  const yearDateEpisodes = await Bluebird.props({
    events: createOfKind(events, EpisodeKind.events),
    births: createOfKind(births, EpisodeKind.births),
    deaths: createOfKind(deaths, EpisodeKind.deaths),
  });
  yearDate.set(yearDateEpisodes);
  return yearDate.save();
}

function getFormattedDates(
  data: SeedData,
): {
  formattedDates: string[];
  progressBar: ProgressBar;
} {
  const singleMonth = process.env.SLIM
    ? MONTHS.find(({ name }) => name === 'January')
    : undefined;

  const progressBar = singleMonth
    ? buildProgressBar({ total: singleMonth.days })
    : buildProgressBar();

  const formattedDates = singleMonth
    ? Object.keys(data).filter((date) => date.includes(singleMonth.name))
    : Object.keys(data);

  return { formattedDates, progressBar };
}

export async function createYearDates(
  data: SeedData,
  yearDateModel: YearDateModel,
  episodeModel: EpisodeModel,
): Promise<void> {
  const { formattedDates, progressBar } = getFormattedDates(data);
  for (const formattedDate of formattedDates) {
    await createYearDate(
      formattedDate,
      data[formattedDate],
      yearDateModel,
      episodeModel,
    );
    progressBar.tick();
  }
}
