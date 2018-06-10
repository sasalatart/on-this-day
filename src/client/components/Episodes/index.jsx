import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import EpisodesList from './List';
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
      <EpisodesList
        episodeType={type}
        day={day}
        month={month}
        description={description}
        episodes={episodes}
      />
    );
  }

  render() {
    const { events, births, deaths } = this.props.location.data;

    const eventsIcon = <FontIcon className="fa fa-calendar" />;
    const birthsIcon = <FontIcon className="fa fa-birthday-cake" />;
    const deathsIcon = <FontIcon className="fa fa-times" />;

    return (
      <div style={theme.height100}>
        <Tabs onChange={this.handleTabChange} value={this.state.currentTab}>
          <Tab label="Events" value={TABS.events} icon={eventsIcon}>
            {this.renderEpisodesList('Events', events)}
          </Tab>
          <Tab label="Births" value={TABS.births} icon={birthsIcon}>
            {this.renderEpisodesList('Births', births)}
          </Tab>
          <Tab label="Deaths" value={TABS.deaths} icon={deathsIcon}>
            {this.renderEpisodesList('Deaths', deaths)}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
