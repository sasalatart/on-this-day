import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import PaperBox from './PaperBox';

const styles = {
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
  handleDayChange,
  handleMonthChange,
  handleSubmit,
  loading,
}) => (
  <div className="height-100 flex justify-center align-center">
    <PaperBox>
      <div className="height-100 flex justify-center flex-column">
        <div>
          <h1 className="centered-text">Search For Historical Episodes</h1>

          <h2 className="centered-text">
            Data Taken From <a href="http://www.wikipedia.org" target="_blank" rel="noopener noreferrer">Wikipedia</a>
          </h2>
        </div>

        <div className="flex flex-wrap justify-space-around">
          <TextField
            floatingLabelText="Insert day"
            hintText="Example: 15"
            errorText={errors.day}
            onChange={handleDayChange}
            value={currentDay}
          />

          <AutoComplete
            floatingLabelText="Insert month"
            hintText="Example: April"
            errorText={errors.month}
            dataSource={possibleMonths}
            filter={AutoComplete.caseInsensitiveFilter}
            onUpdateInput={handleMonthChange}
            searchText={currentMonth}
          />

          <RaisedButton
            label={properSubmitButtonLabel(loading)}
            icon={properSubmitButtonIcon(loading)}
            primary
            disabled={submitDisabled(loading, errors)}
            onTouchTap={handleSubmit}
            style={styles.button}
          />
        </div>
      </div>
    </PaperBox>
  </div>
);

Landing.propTypes = {
  currentDay: PropTypes.string.isRequired,
  currentMonth: PropTypes.string.isRequired,
  possibleMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
  errors: PropTypes.shape({ day: PropTypes.string, month: PropTypes.string }).isRequired,
  handleDayChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Landing;
