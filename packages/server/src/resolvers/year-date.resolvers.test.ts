import { gql } from 'apollo-server-express';
import { mapValues, sortBy } from 'lodash';
import { EpisodeKind, YearDate } from '@on-this-day/shared';
import models, { YearDateDocument } from '../models';
import { createYearDate } from '../tests/factories';
import createTestServer from '../tests/server';

const EPISODE_FRAGMENT = gql`
  fragment EpisodeFragment on Episode {
    id
    year
    month
    day
    description
    keywords {
      title
      href
    }
  }
`;

describe('yearDates resolvers', () => {
  const server = createTestServer();

  describe('yearDate', () => {
    let yearDateDocument: YearDateDocument;
    let anotherYearDateDocument: YearDateDocument;
    let queryResponse: YearDate;

    const query = gql`
      query yearDate($input: YearDateQueryInput!) {
        yearDate(input: $input) {
          id
          month
          day
          events {
            ...EpisodeFragment
          }
          births {
            ...EpisodeFragment
          }
          deaths {
            ...EpisodeFragment
          }
        }
      }
      ${EPISODE_FRAGMENT}
    `;

    const input = { month: 4, day: 15 };

    beforeAll(async () => {
      [
        { yearDate: yearDateDocument },
        { yearDate: anotherYearDateDocument },
      ] = await Promise.all([
        createYearDate(
          input,
          mapValues(EpisodeKind, () => 2),
        ),
        createYearDate(
          { day: 1, month: 1 },
          mapValues(EpisodeKind, () => 2),
        ),
      ]);
    });

    afterAll(() =>
      Promise.all([
        yearDateDocument.remove(),
        anotherYearDateDocument.remove(),
      ]),
    );

    it('returns the yearDate corresponding to the specified day and month', async () => {
      const gqlResponse = await server.query({ query, variables: { input } });

      if (!gqlResponse.data || !gqlResponse.data.yearDate) {
        throw new Error('yearDate not present in response');
      }

      queryResponse = gqlResponse.data.yearDate;
      return expect(
        models.YearDate.exists({ _id: queryResponse.id, ...input }),
      ).resolves.toBeTruthy();
    });

    it('returns all episodes for the specified date', () => {
      Object.values(EpisodeKind).forEach((episodeKind) => {
        expect(queryResponse[episodeKind].map(({ id }) => id).sort()).toEqual(
          Array.from(yearDateDocument[episodeKind])
            .map((id) => id.toHexString())
            .sort(),
        );
      });
    });

    it('returns all episodes sorted by ascending year', () => {
      Object.values(EpisodeKind).forEach((episodeKind) => {
        expect(queryResponse[episodeKind]).toEqual(
          sortBy(queryResponse[episodeKind], 'year'),
        );
      });
    });
  });
});
