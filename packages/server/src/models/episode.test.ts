import { EpisodeKind } from '@on-this-day/shared';
import { createYearDate } from '../tests/factories';
import { Episode } from './episode';

describe('Episode Model', () => {
  describe('attributes', () => {
    describe('yearDate', () => {
      it('is required', () => expect('yearDate').toBeRequiredFor(Episode));

      it('is consistent with the "day" and "month" values', async () => {
        const { yearDate } = await createYearDate({ month: 1, day: 1 });
        const opts = { message: 'errors.yearDateConsistency' };
        await Promise.all([
          expect(
            new Episode({
              yearDate: yearDate.id,
              month: yearDate.month + 1,
              day: yearDate.day + 1,
            }),
          ).toFailValidation('yearDate', opts),
          expect(
            new Episode({
              yearDate: yearDate.id,
              month: yearDate.month,
              day: yearDate.day,
            }),
          ).not.toFailValidation('yearDate', opts),
        ]);
        return yearDate.remove();
      });
    });

    describe('year', () => {
      it('is required', () => expect('year').toBeRequiredFor(Episode));
    });

    describe('month', () => {
      it('is required', () => expect('month').toBeRequiredFor(Episode));

      it('must be a number between 1 and 12', () => {
        return expect('month').toBeBetween(1, 12, Episode);
      });
    });

    describe('day', () => {
      it('is required', () => expect('day').toBeRequiredFor(Episode));

      it('must be a number between 1 and 31', () => {
        return expect('day').toBeBetween(1, 31, Episode);
      });

      it('must be less than the maximum number of days for the month', () => {
        const opts = { message: 'errors.invalidDayForMonth' };
        return Promise.all([
          expect(new Episode({ month: 2, day: 30 })).toFailValidation(
            'day',
            opts,
          ),
          expect(new Episode({ month: 2, day: 29 })).not.toFailValidation(
            'day',
            opts,
          ),
        ]);
      });
    });

    describe('kind', () => {
      it('is required', () => expect('kind').toBeRequiredFor(Episode));

      Object.values(EpisodeKind).forEach((episodeKind) => {
        it(`accepts the value ${episodeKind}`, () => {
          return expect('kind').not.toFailEnumFor(episodeKind, Episode);
        });
      });

      it('does not accept a random value', () => {
        return expect('kind').toFailEnumFor('random', Episode);
      });
    });

    describe('description', () => {
      it('is required', () => expect('description').toBeRequiredFor(Episode));
    });

    describe('keywords', () => {
      describe('title', () => {
        it('is required', () => {
          return expect(
            new Episode({ keywords: [{ href: '/something' }] }),
          ).toFailValidation('keywords.0.title', { kind: 'required' });
        });
      });

      describe('href', () => {
        it('is required', () => {
          return expect(
            new Episode({ keywords: [{ title: 'Something' }] }),
          ).toFailValidation('keywords.0.href', { kind: 'required' });
        });
      });
    });
  });
});
