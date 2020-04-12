import gql from 'graphql-tag';
import { EPISODE_FRAGMENT } from './fragments';

export const YEAR_DATE_QUERY = gql`
  query yearDate($input: YearDateQueryInput!) {
    yearDate(input: $input) {
      description
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
