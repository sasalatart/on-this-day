import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import PaperBox from './Layout/PaperBox';
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

function Landing({
  currentDay,
  currentMonth,
  possibleMonths,
  errors,
  onDayChange,
  onMonthChange,
  onSubmit,
  loading,
}) {
  const submitIcon = <FontIcon className={loading ? 'fa fa-spin fa-spinner' : 'fa fa-search'} />;

  return (
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

            <form onSubmit={onSubmit} style={styles.form}>
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
                type="submit"
                primary
                label={loading ? 'Searching' : 'Search'}
                icon={submitIcon}
                onClick={onSubmit}
                disabled={loading || !!(errors.day || errors.month)}
                style={styles.button}
              />
            </form>
          </div>
        </PaperBox>
      </div>
      <Footer />
    </div>
  );
}

Landing.propTypes = {
  currentDay: PropTypes.string.isRequired,
  currentMonth: PropTypes.string.isRequired,
  possibleMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
  }).isRequired,
  onDayChange: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Landing;
