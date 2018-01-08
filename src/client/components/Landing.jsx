import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import PaperBox from './PaperBox';
import Footer from './Layout/Footer';
import theme from '../theme';

const styles = {
  landing: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    justifyContent: 'spaceAround',
    flexWrap: 'wrap',
  },
  button: {
    margin: 20,
  },
};

const properSubmitButtonIcon = (loading) => {
  const className = loading ? 'fa fa-spin fa-spinner' : 'fa fa-search';
  return <FontIcon className={className} />;
};

const properSubmitButtonLabel = loading => (
  loading ? 'Searching' : 'Search'
);

const submitDisabled = (loading, errors) => (
  loading || !!(errors.day || errors.month)
);

const Landing = ({
  currentDay,
  currentMonth,
  possibleMonths,
  errors,
  onDayChange,
  onMonthChange,
  onSubmit,
  loading,
}) => (
  <div style={styles.landing}>
    <div style={styles.wrapper}>
      <PaperBox>
        <div>
          <h1 style={theme.h1}>Search For Historical Episodes</h1>

          <h2 style={theme.h2}>
            <a
              href="http://www.wikipedia.org"
              style={theme.anchor}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source: Wikipedia
            </a>
          </h2>

          <form style={styles.form}>
            <TextField
              floatingLabelText="Insert day"
              hintText="Example: 15"
              errorText={errors.day}
              onChange={onDayChange}
              value={currentDay}
            />

            <AutoComplete
              floatingLabelText="Insert month"
              hintText="Example: April"
              errorText={errors.month}
              dataSource={possibleMonths}
              filter={AutoComplete.caseInsensitiveFilter}
              onUpdateInput={onMonthChange}
              searchText={currentMonth}
            />

            <RaisedButton
              label={properSubmitButtonLabel(loading)}
              icon={properSubmitButtonIcon(loading)}
              primary
              disabled={submitDisabled(loading, errors)}
              onTouchTap={onSubmit}
              style={styles.button}
            />
          </form>
        </div>
      </PaperBox>
    </div>
    <Footer />
  </div>
);

Landing.propTypes = {
  currentDay: PropTypes.string.isRequired,
  currentMonth: PropTypes.string.isRequired,
  possibleMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  errors: PropTypes.shape({ day: PropTypes.string, month: PropTypes.string }).isRequired,
  onDayChange: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Landing;
