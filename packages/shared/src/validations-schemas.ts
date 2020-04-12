import * as Yup from 'yup';
import { daysByMonthNumber } from './dates';

const dayOfMonth = Yup.object().shape({
  day: Yup.number()
    .integer()
    .positive()
    .lessThan(32)
    .test(
      'invalid-day-for-month',
      'errors.invalidDayForMonth',
      function assertValidDayForMonth(value) {
        return value <= daysByMonthNumber[this.parent.month];
      },
    ),
  month: Yup.number().integer().positive().lessThan(13),
});

export default {
  dayOfMonth,
};
