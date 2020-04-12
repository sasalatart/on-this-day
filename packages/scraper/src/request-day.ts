import request from 'request-promise';
import { ScrapedYearDate } from '@on-this-day/shared';
import scrape from './scrape';

export default function timeoutedRequest(
  day: string,
  timeoutMS: number,
): Promise<ScrapedYearDate> {
  return new Promise((res, rej) => {
    const [monthName, dayOfMonth] = day.split('-');
    setTimeout(() => {
      return request(`https://en.wikipedia.org/wiki/${monthName}_${dayOfMonth}`)
        .then((body) => res(scrape(body)))
        .catch(rej);
    }, timeoutMS);
  });
}
