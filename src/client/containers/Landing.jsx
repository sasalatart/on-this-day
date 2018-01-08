import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import swal from 'sweetalert';
import qs from 'qs';
import jsonFetch from '../utils/fetch';
import Landing from '../components/Landing';
import {
  getMonthName,
  getMonthNumber,
  allPossibleMonths,
  possibleMonthsForDay,
  getDateErrors,
} from '../utils/dates';

const currentDay = `${moment().date()}`;
const currentMonth = moment().startOf('month').format('MMMM');

class LandingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDay,
      currentMonth,
      possibleMonths: possibleMonthsForDay(currentDay),
      errors: {
        day: undefined,
        month: undefined,
      },
      loading: false,
    };

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const { day, month } = qs.parse(search, { ignoreQueryPrefix: true });
    const monthName = getMonthName(month);

    const dateErrors = getDateErrors(day, month);
    if (dateErrors.day || dateErrors.month) {
      return;
    }

    const event = new CustomEvent('Direct URL');
    this.handleDayChange(event, day);
    this.handleMonthChange(monthName);
    setTimeout(() => this.handleSubmit(event), 0);
  }

  handleDayChange(event, day) {
    const dateErrors = getDateErrors(day, getMonthNumber(this.state.currentMonth));
    const newState = { currentDay: day, errors: dateErrors };

    newState.possibleMonths = dateErrors.day
      ? allPossibleMonths
      : possibleMonthsForDay(parseInt(day, 10));

    this.setState(newState);
  }

  handleMonthChange(monthName) {
    const dateErrors = getDateErrors(this.state.currentDay, getMonthNumber(monthName));
    const newState = { currentMonth: monthName, errors: dateErrors };
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ loading: true });
    const month = getMonthNumber(this.state.currentMonth);
    const route = `episodes?day=${this.state.currentDay}&month=${month}`;
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
        onDayChange={this.handleDayChange}
        onMonthChange={this.handleMonthChange}
        onSubmit={this.handleSubmit}
        loading={this.state.loading}
      />
    );
  }
}

LandingContainer.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default LandingContainer;
