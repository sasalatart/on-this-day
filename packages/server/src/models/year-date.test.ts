import { MongoError } from 'mongodb';
import { createYearDate } from '../tests/factories';
import { Episode } from './episode';
import { YearDate } from './year-date';

describe('YearDate Model', () => {
  describe('attributes', () => {
    describe('month', () => {
      it('is required', () => expect('month').toBeRequiredFor(YearDate));

      it('must be a number between 1 and 12', () => {
        return expect('month').toBeBetween(1, 12, YearDate);
      });
    });

    describe('day', () => {
      it('is required', () => expect('day').toBeRequiredFor(YearDate));

      it('must be a number between 1 and 31', () => {
        return expect('day').toBeBetween(1, 31, YearDate);
      });

      it('must be less than the maximum number of days for the month', () => {
        const opts = { message: 'errors.invalidDayForMonth' };
        return Promise.all([
          expect(new YearDate({ month: 2, day: 30 })).toFailValidation(
            'day',
            opts,
          ),
          expect(new YearDate({ month: 2, day: 29 })).not.toFailValidation(
            'day',
            opts,
          ),
        ]);
      });

      it('is unique within the same month', async () => {
        const { yearDate } = await createYearDate();
        await expect(
          createYearDate({
            day: yearDate.day,
            month: yearDate.month,
          }),
        ).rejects.toBeInstanceOf(MongoError);
        return yearDate.remove();
      });
    });

    describe('description', () => {
      it('is required', () => expect('description').toBeRequiredFor(YearDate));
    });
  });

  describe('middleware', () => {
    describe('post remove', () => {
      it('cascade removes all related episodes', async () => {
        const { yearDate } = await createYearDate(
          {},
          { events: 2, births: 2, deaths: 2 },
        );
        await yearDate.remove();
        return expect(
          Episode.countDocuments({ yearDate: yearDate.id }),
        ).resolves.toBe(0);
      });
    });
  });
});
