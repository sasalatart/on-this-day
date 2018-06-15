import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PaperBox from '../../Layout/PaperBox';
import theme from '../../../theme';

const styles = {
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function writeDescription(description) {
  return (
    /* eslint-disable react/no-array-index-key */
    description
      .split('\n')
      .map((paragraph, index) => <p key={index} style={theme.justifiedText}>{paragraph}</p>)
  );
}

function TimeLineHeader({
  episodesType,
  month,
  day,
  description,
}) {
  return (
    <div style={styles.boxWrapper}>
      <PaperBox>
        <Fragment>
          <h1 style={theme.h1}>{episodesType}</h1>
          <h2 style={theme.h2}>{month} {day}</h2>
          {writeDescription(description)}
        </Fragment>
      </PaperBox>
    </div>
  );
}

TimeLineHeader.propTypes = {
  episodesType: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TimeLineHeader;
