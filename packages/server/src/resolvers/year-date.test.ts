import { gql } from 'apollo-server-express';
import { Document, Types as MongooseTypes } from 'mongoose';
import _ from 'lodash';
import { EpisodeKinds } from '@on-this-day/shared';
import models, { YearDateDocument, EpisodeDocument } from '../models';
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

function mapToIds(documents: Document[]): string[] {
  return documents.map((document) =>
    new MongooseTypes.ObjectId(document.id).toHexString(),
  );
}

describe('yearDates resolvers', () => {
  const server = createTestServer();

  describe('yearDate', () => {
    let yearDate: YearDateDocument;
    let anotherYearDate: YearDateDocument;
    let queryResponse: YearDateDocument;

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
      const episodesPerKindPerYearDate = _.mapValues(EpisodeKinds, () => 2);
      [{ yearDate }, { yearDate: anotherYearDate }] = await Promise.all([
        createYearDate(input, episodesPerKindPerYearDate),
        createYearDate({ day: 1, month: 1 }, episodesPerKindPerYearDate),
      ]);
    });

    afterAll(() => Promise.all([yearDate.remove(), anotherYearDate.remove()]));

    it('returns the yearDate corresponding to the specified day and month', async () => {
      const gqlResponse = await server.query({ query, variables: { input } });

      if (!gqlResponse.data || !gqlResponse.data.yearDate) {
        throw new Error('yearDate not present in response');
      }

      queryResponse = gqlResponse.data.yearDate as YearDateDocument;
      return expect(
        models.YearDate.exists({ _id: queryResponse.id, ...input }),
      ).resolves.toBeTruthy();
    });

    it('returns all episodes for the specified date', () => {
      const assertAllEpisodesPresent = (
        episodes: EpisodeDocument[],
        kind: EpisodeKinds,
      ): void => {
        expect(mapToIds(Array.from(yearDate[kind])).sort()).toEqual(
          mapToIds(episodes).sort(),
        );
      };

      Object.values(EpisodeKinds).forEach((episodeKind) => {
        assertAllEpisodesPresent(queryResponse[episodeKind], episodeKind);
      });
    });

    it('returns all episodes sorted by ascending years', () => {
      const assertEpisodesSorted = (episodes: EpisodeDocument[]): void => {
        expect(mapToIds(episodes)).toEqual(
          _.sortBy(mapToIds(episodes), 'year'),
        );
      };

      Object.values(EpisodeKinds).forEach((episodeKind) => {
        assertEpisodesSorted(queryResponse[episodeKind]);
      });
    });
  });
});
