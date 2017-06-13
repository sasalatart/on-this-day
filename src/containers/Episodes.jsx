import React, { Component } from 'react';
import Episodes, { tabs } from '../components/Episodes';

class EpisodesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { currentTab: tabs.events };

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(tab) {
    this.setState({ currentTab: tab });
  }

  render() {
    return (
      <Episodes
        {...this.props}
        currentTab={this.state.currentTab}
        handleTabChange={this.onTabChange}
      />
    );
  }
}

export default EpisodesContainer;
