import Bluebird from 'bluebird';
import jsonfile from 'jsonfile';
import {
  buildProgressBar,
  DATES_OF_YEAR,
  ScrapedYearDate,
} from '@on-this-day/shared';
import { OUTPUT_FILE_DIR, REQUEST_DELAY, REQUEST_CONCURRENCY } from './config';
import { scrapeYearDate } from './scrape';

export async function scrapeYear(
  concurrency = REQUEST_CONCURRENCY,
): Promise<void> {
  console.log('⏳ Scraping...');

  const progressBar = buildProgressBar();
  const byDate: { [k: string]: ScrapedYearDate } = {};
  await Bluebird.map(
    DATES_OF_YEAR,
    async ({ monthName, day }) => {
      byDate[day] = await scrapeYearDate(monthName, day, REQUEST_DELAY);
      progressBar.tick();
    },
    { concurrency },
  );

  jsonfile.writeFileSync(OUTPUT_FILE_DIR, byDate);
  progressBar.update(1);
  console.log(`✅ Results written to ${OUTPUT_FILE_DIR}.`);
}

scrapeYear();
