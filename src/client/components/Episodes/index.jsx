import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import EpisodesTimeLine from './TimeLine';
import { EPISODE_TYPES, EPISODE_ICONS } from './TimeLine/Item';
import customPropTypes from '../../prop-types';
import theme from '../../theme';

const TABS = {
  events: 0,
  births: 1,
  deaths: 2,
};

export default class Episodes extends Component {
  static propTypes = {
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
  }

  state = { currentTab: TABS.events };

  handleTabChange = (tab) => {
    this.setState({ currentTab: tab });
  }

  renderEpisodesList(type, episodes) {
    const { query: { day, month }, data: { description } } = this.props.location;

    return (
      <EpisodesTimeLine
        episodesType={type}
        day={day}
        month={month}
        description={description}
        episodes={episodes}
      />
    );
  }

  render() {
    const { events, births, deaths } = this.props.location.data;

    return (
      <div style={theme.height100}>
        <Tabs onChange={this.handleTabChange} value={this.state.currentTab}>
          <Tab label={EPISODE_TYPES.events} value={TABS.events} icon={EPISODE_ICONS.Events}>
            {this.renderEpisodesList(EPISODE_TYPES.events, events)}
          </Tab>
          <Tab label={EPISODE_TYPES.births} value={TABS.births} icon={EPISODE_ICONS.Births}>
            {this.renderEpisodesList(EPISODE_TYPES.births, births)}
          </Tab>
          <Tab label={EPISODE_TYPES.deaths} value={TABS.deaths} icon={EPISODE_ICONS.Deaths}>
            {this.renderEpisodesList(EPISODE_TYPES.deaths, deaths)}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
