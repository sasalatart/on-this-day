import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import EventIcon from 'material-ui/svg-icons/action/stars';
import BirthIcon from 'material-ui/svg-icons/social/cake';
import DeathIcon from 'material-ui/svg-icons/navigation/cancel';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { blue500, green500, red500 } from 'material-ui/styles/colors';
import KeyWords from './KeyWords';
import customPropTypes from '../../../prop-types';

export const EPISODE_TYPES = {
  events: 'Events',
  births: 'Births',
  deaths: 'Deaths',
};

export const EPISODE_ICONS = {
  [EPISODE_TYPES.events]: <EventIcon />,
  [EPISODE_TYPES.births]: <BirthIcon />,
  [EPISODE_TYPES.deaths]: <DeathIcon />,
};

const styles = {
  data: {
    margin: 0,
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  baseIconStyle: {
    marginTop: '25px',
  },
};

const iconStyles = {
  [EPISODE_TYPES.events]: { background: blue500 },
  [EPISODE_TYPES.births]: { background: green500 },
  [EPISODE_TYPES.deaths]: { background: red500 },
};

function renderEpisode(episode, withDivider, key = 'episode') {
  const { data, kw } = episode;

  return (
    <Fragment key={key}>
      <p style={styles.data}>{data}</p>
      {kw && <KeyWords kw={kw} />}
      {withDivider && <Divider style={styles.divider} />}
    </Fragment>
  );
}

function renderEpisodes(episodes) {
  if (episodes.length === 1) return renderEpisode(episodes[0], false);

  return episodes.map((episode, i) =>
    renderEpisode(episode, i !== episodes.length - 1, episode.id));
}

function TimeLineItem({ year, type, episodes }) {
  return (
    <VerticalTimelineElement
      date={year}
      icon={EPISODE_ICONS[type]}
      iconStyle={{ ...iconStyles[type], ...styles.baseIconStyle }}
    >
      {renderEpisodes(episodes)}
    </VerticalTimelineElement>
  );
}

TimeLineItem.propTypes = {
  year: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  episodes: customPropTypes.episodes.isRequired,
};

export default TimeLineItem;
