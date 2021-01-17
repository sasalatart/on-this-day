import * as Yup from 'yup';
import { DAYS_BY_MONTH_NUMBER } from './dates';

export const dayOfMonthSchema = Yup.object().shape({
  day: Yup.number()
    .integer()
    .positive()
    .lessThan(32)
    .test(
      'invalid-day-for-month',
      'errors.invalidDayForMonth',
      function assertValidDayForMonth(value) {
        return value <= DAYS_BY_MONTH_NUMBER[this.parent.month];
      },
    ),
  month: Yup.number().integer().positive().lessThan(13),
});
