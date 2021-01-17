import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import times from 'lodash/times';
import { MonthName } from './types';

const NOW = new Date();

export const TODAY = {
  day: NOW.getDate(),
  month: NOW.getMonth() + 1,
};

export const DAYS_BY_MONTH_NUMBER: { [k: string]: number } = {
  '1': 31,
  '2': 29,
  '3': 31,
  '4': 30,
  '5': 31,
  '6': 30,
  '7': 31,
  '8': 31,
  '9': 30,
  '10': 31,
  '11': 30,
  '12': 31,
};

export const MONTHS: { name: MonthName; number: number; days: number }[] = [
  { name: 'January', number: 1 },
  { name: 'February', number: 2 },
  { name: 'March', number: 3 },
  { name: 'April', number: 4 },
  { name: 'May', number: 5 },
  { name: 'June', number: 6 },
  { name: 'July', number: 7 },
  { name: 'August', number: 8 },
  { name: 'September', number: 9 },
  { name: 'October', number: 10 },
  { name: 'November', number: 11 },
  { name: 'December', number: 12 },
].map(({ name, number }) => ({
  name: name as MonthName,
  number,
  days: DAYS_BY_MONTH_NUMBER[`${number}`],
}));

export const MONTHS_BY_NAME = keyBy(MONTHS, 'name');

export const MONTHS_NUMBERS_BY_NAME = mapValues(MONTHS_BY_NAME, 'number');

export const DATES_OF_YEAR = MONTHS.map(({ name, days }) =>
  times(days, (i) => ({ monthName: name, day: i + 1 })),
).flat();
