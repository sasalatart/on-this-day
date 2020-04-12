import Bluebird from 'bluebird';
import jsonfile from 'jsonfile';
import { buildProgressBar, months, YearDate } from '@on-this-day/shared';
import { DELAY_BETWEEN_REQUESTS, OUTPUT_FILE_DIR } from './config';
import requestYearDate from './request-day';

type EmptyDate = { [k: string]: null };

function createEmptyYear(): EmptyDate {
  const rawYearDates: EmptyDate = {};
  months.forEach(({ name: monthName, days }) => {
    for (let day = 1; day <= days; day += 1) {
      rawYearDates[`${monthName}-${day}`] = null;
    }
  });
  return rawYearDates;
}

export default async function scrapYear(): Promise<void> {
  console.log('⏳ Scraping...');

  const progressBar = buildProgressBar();
  const dates = createEmptyYear();

  const byDate: { [k: string]: Promise<YearDate> } = {};
  Object.keys(dates).forEach((day, index) => {
    byDate[day] = requestYearDate(day, index * DELAY_BETWEEN_REQUESTS).then(
      (result) => {
        progressBar.tick();
        return result;
      },
    ) as Promise<YearDate>;
  });

  jsonfile.writeFileSync(OUTPUT_FILE_DIR, await Bluebird.props(byDate));
  progressBar.update(1);
  console.log(`✅ Results written to ${OUTPUT_FILE_DIR}.`);
}

scrapYear();
