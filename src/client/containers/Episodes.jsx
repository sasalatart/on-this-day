import React, { Component } from 'react';
import Episodes, { tabs } from '../components/Episodes';

class EpisodesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { currentTab: tabs.events };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(tab) {
    this.setState({ currentTab: tab });
  }

  render() {
    return (
      <Episodes
        {...this.props}
        currentTab={this.state.currentTab}
        onTabChange={this.handleTabChange}
      />
    );
  }
}

export default EpisodesContainer;
