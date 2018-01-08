import capitalize from 'lodash/capitalize';

export const months = [
  { value: 1, days: 31, label: 'January' },
  { value: 2, days: 29, label: 'February' },
  { value: 3, days: 31, label: 'March' },
  { value: 4, days: 30, label: 'April' },
  { value: 5, days: 31, label: 'May' },
  { value: 6, days: 30, label: 'June' },
  { value: 7, days: 31, label: 'July' },
  { value: 8, days: 31, label: 'August' },
  { value: 9, days: 30, label: 'September' },
  { value: 10, days: 31, label: 'October' },
  { value: 11, days: 30, label: 'November' },
  { value: 12, days: 31, label: 'December' },
];

const days = [];
for (let i = 1; i <= 31; i += 1) {
  days.push(i);
}

export const possibleDaysForMonth = monthName => (
  days
    .slice(0, months.find(month => capitalize(month.label) === capitalize(monthName)).days)
);

export const allPossibleMonths = months.map(monthInfo => capitalize(monthInfo.label));

export const possibleMonthsForDay = dayIndex => (
  months
    .filter(monthInfo => monthInfo.days >= dayIndex)
    .map(monthInfo => capitalize(monthInfo.label))
);

export const getMonthName = month => (
  (months.find(({ value }) => value === +month) || {}).label
);

export const getMonthNumber = monthName => (
  (months.find(({ label }) => label === capitalize(monthName)) || {}).value
);

const validateDay = (day, currentMonth) => (
  possibleDaysForMonth(currentMonth).includes(parseInt(day, 10))
);

const validateMonth = (currentDay, monthName) => (
  possibleMonthsForDay(parseInt(currentDay, 10)).includes(capitalize(monthName))
);

export const getDateErrors = (day, month) => {
  const errors = {};

  if (!day || isNaN(day) || +day < 1 || +day > 31) {
    errors.day = 'Invalid Day';
  }

  if (!month || isNaN(month) || +month < 1 || +month > 12) {
    errors.month = 'Invalid Month';
  }

  if (!errors.day && !errors.month) {
    const monthName = getMonthName(month);

    if (!validateDay(day, monthName) || !validateMonth(day, monthName)) {
      errors.day = `Invalid day for ${monthName}`;
      errors.month = `Invalid month for day ${day}`;
    }
  }

  return errors;
};
