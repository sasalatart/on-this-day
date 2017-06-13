import React, { Component } from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import jsonFetch from '../utils/fetch';
import Landing from '../components/Landing';
import {
  possibleDaysForMonth,
  possibleMonthsForDay,
  validateDay,
  validateMonth,
  translateMonth,
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

  onSubmit(event) {
    event.preventDefault();

    this.setState({ loading: true });

    const intMonth = translateMonth(this.state.currentMonth);
    const route = `/episodes?day=${this.state.currentDay}&month=${intMonth}`;
    jsonFetch(`api/${route}`)
      .then((response) => {
        /* eslint-disable react/prop-types */
        this.props.history.push({
          pathname: `${route}`,
          query: { day: this.state.currentDay, month: this.state.currentMonth },
          data: response,
        });
      })
      .catch((err) => {
        swal('Error', err.message, 'error');
        this.setState({ loading: false });
      });
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
