import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { blue900, transparent } from 'material-ui/styles/colors';
import customPropTypes from '../../prop-types';
import theme from '../../theme';

const styles = {
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

  const keywords = kw
    .map(({ href, title }) => (
      <a
        key={title}
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

const EpisodeListItem = ({ _id, data, year, kw }) => {
  const leftAvatar = (
    <Avatar color={blue900} backgroundColor={transparent}>
      <p style={theme.centeredText}>{year}</p>
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
  kw: customPropTypes.keywords,
};

EpisodeListItem.defaultProps = {
  kw: undefined,
};

export default EpisodeListItem;
