/* eslint-disable react/no-array-index-key */
import React from 'react';

const WIKI_URL = 'http://wikipedia.org';

export default function generateKeywordsText(kw) {
  if (!kw) {
    return undefined;
  }

  const keyWords = kw
    .map(({ href, title }, index) => (
      <a key={index} href={`${WIKI_URL}/${href}`} target="_blank" rel="noopener noreferrer">{title}</a>),
    );

  return <p className="keywords">Keywords: { keyWords }</p>;
}
