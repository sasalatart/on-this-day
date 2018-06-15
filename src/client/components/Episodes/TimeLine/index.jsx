import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import groupBy from 'lodash/groupBy';
import TimeLineHeader from './Header';
import TimeLineItem from './Item';
import customPropTypes from '../../../prop-types';

function EpisodesTimeLine({ episodes, ...rest }) {
  const groupedEpisodes = groupBy(episodes, ({ year, isBCE }) => year * (isBCE ? -1 : 1));
  const sortedYears = Object.keys(groupedEpisodes).sort(((a, b) => +a - +b));

  return (
    <Fragment>
      <TimeLineHeader {...rest} />

      <VerticalTimeline>
        {sortedYears.map(year => (
          <TimeLineItem
            key={year}
            year={year < 0 ? `${-year} B.C.E` : String(year)}
            episodes={groupedEpisodes[year]}
            type={rest.episodesType}
          />
        ))}
      </VerticalTimeline>
    </Fragment>
  );
}

EpisodesTimeLine.propTypes = {
  episodesType: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  episodes: customPropTypes.episodes.isRequired,
};

export default EpisodesTimeLine;
