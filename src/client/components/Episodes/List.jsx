import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import PaperBox from '../PaperBox';
import EpisodesListItem from './ListItem';
import customPropTypes from '../../custom-prop-types';

const writeDescription = description => (
  /* eslint-disable react/no-array-index-key */
  description
    .split('\n')
    .map((paragraph, index) => (
      <p key={index} className="description justified-text">{paragraph}</p>
    ))
);

const EpisodesList = ({ episodeType, day, month, description, episodes }) => (
  <div className="flex justify-center">
    <PaperBox>
      <div>
        <h1 className="centered-text">{episodeType}</h1>
        <h2 className="centered-text">{`${month} ${day}`}</h2>
        {writeDescription(description)}

        <List>
          {episodes.map(EpisodesListItem)}
        </List>
      </div>
    </PaperBox>
  </div>
);

EpisodesList.propTypes = {
  episodeType: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  episodes: customPropTypes.episodes.isRequired,
};

export default EpisodesList;
