import React, { Fragment } from 'react';
import customPropTypes from '../../../prop-types';
import theme from '../../../theme';

const styles = {
  keywords: {
    fontWeight: 'bold',
    marginTop: '0.75em',
  },
  keyword: {
    ...theme.anchor,
    fontStyle: 'italic',
  },
};

const WIKI_URL = 'http://wikipedia.org';

function KeyWords({ kw }) {
  /* eslint-disable react/no-array-index-key */
  const keywords = kw
    .map(({ href, title }, index) => (
      <Fragment key={index}>
        <a href={`${WIKI_URL}${href}`} style={styles.keyword} target="_blank">
          {title}
        </a>
        {index !== kw.length - 1 && <span>, </span>}
      </Fragment>
    ));

  return <p style={styles.keywords}>Keywords: {keywords}</p>;
}

KeyWords.propTypes = {
  kw: customPropTypes.keywords.isRequired,
};

export default KeyWords;
