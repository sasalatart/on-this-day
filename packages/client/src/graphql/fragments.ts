import { gql } from 'apollo-boost';

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeFragment on Episode {
    id
    year
    description
    keywords {
      title
      href
    }
  }
`;
