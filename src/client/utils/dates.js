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

export const possibleMonthsForDay = dayIndex => (
  months
    .filter(monthInfo => monthInfo.days >= dayIndex)
    .map(monthInfo => capitalize(monthInfo.label))
);

export const validateDay = (day, currentMonth) => (
  !isNaN(day) && possibleDaysForMonth(currentMonth).includes(parseInt(day, 10))
);

export const validateMonth = (currentDay, monthName) => (
  possibleMonthsForDay(parseInt(currentDay, 10)).includes(capitalize(monthName))
);

export const translateMonth = (monthName, name) => (
  months.find(month => month.label === monthName)[name ? 'label' : 'value']
);
