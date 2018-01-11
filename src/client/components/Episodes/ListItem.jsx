import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { blue900, red300, transparent } from 'material-ui/styles/colors';
import customPropTypes from '../../prop-types';
import theme from '../../theme';

const styles = {
  yearContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: transparent,
  },
  year: {
    margin: '5px',
  },
  bce: {
    color: red300,
    fontSize: '0.75em',
    margin: '5px',
  },
  keywords: {
    fontWeight: 'bold',
    marginTop: '0.75em',
  },
  keyword: {
    ...theme.anchor,
    fontStyle: 'italic',
    marginRight: '1em',
  },
};

function generateKeywordsText(kw) {
  if (!kw) {
    return undefined;
  }

  const wikiUrl = 'http://wikipedia.org';

  /* eslint-disable react/no-array-index-key */
  const keywords = kw
    .map(({ href, title }, index) => (
      <a
        key={index}
        href={`${wikiUrl}${href}`}
        style={styles.keyword}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    ));

  return <p style={styles.keywords}>Keywords: {keywords}</p>;
}

const EpisodeListItem = ({ _id, data, year, isBCE, kw }) => {
  const leftAvatar = (
    <Avatar color={blue900} style={styles.yearContainer}>
      <p style={styles.year}>{year}</p>
      {isBCE && <p style={styles.bce}>BCE</p>}
    </Avatar>
  );

  return (
    <div key={_id}>
      <Divider />
      <ListItem
        leftAvatar={leftAvatar}
        primaryText={data}
        secondaryText={generateKeywordsText(kw)}
        disabled
      />
    </div>
  );
};

EpisodeListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  isBCE: PropTypes.bool.isRequired,
  kw: customPropTypes.keywords,
};

EpisodeListItem.defaultProps = {
  kw: undefined,
};

export default EpisodeListItem;
