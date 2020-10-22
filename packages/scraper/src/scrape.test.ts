import {
  MonthName,
  ScrapedEpisode,
  ScrapedYearDate,
} from '@on-this-day/shared';
import scrapeYearDate from './scrape';

describe('scrapeYearDate', () => {
  describe('with invalid day of month', () => {
    function assertRejectsFor(
      monthName: MonthName,
      dayOfMonth: number,
    ): Promise<void> {
      return expect(
        scrapeYearDate(monthName, dayOfMonth, 0),
      ).rejects.toBeInstanceOf(Error);
    }

    describe('with negative day of month', () => {
      it('rejects', () => {
        return assertRejectsFor('January', -1);
      });
    });

    describe('with 0 day of month', () => {
      it('rejects', () => {
        return assertRejectsFor('January', 0);
      });
    });

    describe('with day of month greater than maximum for the given month', () => {
      it('rejects', () => {
        return assertRejectsFor('January', 32);
      });
    });
  });

  describe('with valid day of month', () => {
    let result: ScrapedYearDate;

    async function setResult(): Promise<void> {
      result = result || (await scrapeYearDate('January', 1, 0));
    }

    function assertHasEpisode(
      episodes: ScrapedEpisode[],
      year: number,
      description: string,
    ): void {
      expect(
        episodes.find((episode) => {
          return episode.description === description && episode.year === year;
        }),
      ).toBeDefined();
    }

    it('scrapes descriptions', async () => {
      await setResult();
      const expected = 'January 1 is the first day of the year';
      expect(result.description.includes(expected)).toBeTruthy();
    });

    it('scrapes events', async () => {
      await setResult();
      assertHasEpisode(
        result.events,
        1700,
        'Russia begins using the Anno Domini era instead of the Anno Mundi era of the Byzantine Empire.',
      );
    });

    it('scrapes births', async () => {
      await setResult();
      assertHasEpisode(result.births, 1431, 'Pope Alexander VI (d. 1503)');
    });

    it('scrapes deaths', async () => {
      await setResult();
      assertHasEpisode(
        result.deaths,
        404,
        'Telemachus, Christian monk and martyr',
      );
    });
  });
});
