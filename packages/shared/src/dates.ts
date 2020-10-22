import _ from 'lodash';

export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

const now = new Date();
export const today = {
  day: now.getDate(),
  month: now.getMonth() + 1,
};

export const daysByMonthNumber: { [k: string]: number } = {
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

export const months: { name: MonthName; number: number; days: number }[] = [
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
  days: daysByMonthNumber[`${number}`],
}));

export const monthsByName = _.keyBy(months, 'name');

export const monthNumbersByName = _.mapValues(monthsByName, 'number');

export const datesOfYear = months
  .map(({ name, days }) =>
    _.times(days, (i) => ({ monthName: name, day: i + 1 })),
  )
  .flat();
