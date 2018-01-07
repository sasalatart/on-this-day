import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import EpisodesList from './List';
import customPropTypes from '../../custom-prop-types';

export const tabs = {
  events: 0,
  births: 1,
  deaths: 2,
};

const Episodes = (props) => {
  const {
    location: {
      query: {
        day,
        month,
      },
      data: {
        description,
        events,
        births,
        deaths,
      },
    },
    currentTab,
    handleTabChange,
  } = props;

  const eventsIcon = <FontIcon className="fa fa-calendar" />;
  const birthsIcon = <FontIcon className="fa fa-birthday-cake" />;
  const deathsIcon = <FontIcon className="fa fa-times" />;

  const createEpisodesList = (type, episodes) => (
    <EpisodesList
      episodeType={type}
      day={day}
      month={month}
      description={description}
      episodes={episodes}
    />
  );

  return (
    <div className="height-100">
      <Tabs onChange={handleTabChange} value={currentTab}>
        <Tab label="Events" value={tabs.events} icon={eventsIcon}>
          {createEpisodesList('Events', events)}
        </Tab>
        <Tab label="Births" value={tabs.births} icon={birthsIcon}>
          {createEpisodesList('Births', births)}
        </Tab>
        <Tab label="Deaths" value={tabs.deaths} icon={deathsIcon}>
          {createEpisodesList('Deaths', deaths)}
        </Tab>
      </Tabs>
    </div>
  );
};

Episodes.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      day: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
      description: PropTypes.string.isRequired,
      events: customPropTypes.episodes.isRequired,
      births: customPropTypes.episodes.isRequired,
      deaths: customPropTypes.episodes.isRequired,
    }).isRequired,
  }).isRequired,
  currentTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default Episodes;
