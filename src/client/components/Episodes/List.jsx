import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import PaperBox from '../PaperBox';
import EpisodesListItem from './ListItem';
import customPropTypes from '../../prop-types';
import theme from '../../theme';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const writeDescription = description => (
  /* eslint-disable react/no-array-index-key */
  description
    .split('\n')
    .map((paragraph, index) => (
      <p key={index} style={theme.justifiedText}>{paragraph}</p>
    ))
);

const EpisodesList = ({ episodeType, day, month, description, episodes }) => (
  <div style={styles.wrapper}>
    <PaperBox>
      <div>
        <h1 style={theme.h1}>{episodeType}</h1>
        <h2 style={theme.h2}>{`${month} ${day}`}</h2>
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
