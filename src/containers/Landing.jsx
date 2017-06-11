import React, { Component } from 'react';
import moment from 'moment';
import Landing from '../components/Landing';
import {
  possibleDaysForMonth,
  possibleMonthsForDay,
  validateDay,
  validateMonth,
} from '../utils/dates';

const currentDay = `${moment().date()}`;
const currentMonth = moment().startOf('month').format('MMMM');

class LandingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDay,
      currentMonth,
      possibleDays: possibleDaysForMonth(currentMonth),
      possibleMonths: possibleMonthsForDay(currentDay),
      previousValidDay: currentDay,
      previousValidMonth: currentMonth,
      errors: {
        day: undefined,
        month: undefined,
      },
      loading: false,
    };

    this.onDayChange = this.onDayChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDayChange(event, day) {
    if (validateDay(day, this.state.previousValidMonth)) {
      this.setState({
        currentDay: day,
        previousValidDay: day,
        possibleMonths: possibleMonthsForDay(parseInt(day, 10)),
        errors: { ...this.state.errors, day: undefined },
      });
    } else {
      this.setState({
        currentDay: day, errors: { ...this.state.errors, day: 'Invalid day.' },
      });
    }
  }

  onMonthChange(month) {
    if (validateMonth(this.state.previousValidDay, month)) {
      this.setState({
        currentMonth: month,
        previousValidMonth: month,
        possibleDays: possibleDaysForMonth(month),
        errors: { ...this.state.errors, month: undefined },
      });
    } else {
      this.setState({
        currentMonth: month, errors: { ...this.state.errors, month: 'Invalid month.' },
      });
    }
  }

  onSubmit() {
    this.setState({ loading: !this.state.loading });
  }

  render() {
    return (
      <Landing
        currentDay={this.state.currentDay}
        currentMonth={this.state.currentMonth}
        possibleMonths={this.state.possibleMonths}
        errors={this.state.errors}
        handleDayChange={this.onDayChange}
        handleMonthChange={this.onMonthChange}
        handleSubmit={this.onSubmit}
        loading={this.state.loading}
      />
    );
  }
}

export default LandingContainer;
