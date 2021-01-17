import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Episode } from '@on-this-day/shared';
import { WIKI_URL } from '../../../config';
import { Anchor } from '../../common';

interface Props {
  episode: Episode;
}

export function EpisodeItem({
  episode: { description, keywords },
}: Props): JSX.Element {
  const { t } = useTranslation();

  const keywordsText = useMemo(() => {
    if (!keywords) return null;

    return (
      <KeywordsContainer>
        <Keywords display="inline">{`${t('episodes.keywords')}: `}</Keywords>
        {keywords.map(({ href, title }, index) => (
          <Keywords key={index} display="inline" color="textSecondary">
            <Anchor to={`${WIKI_URL}${href}`}>{title}</Anchor>
            {index !== keywords.length - 1 && ', '}
          </Keywords>
        ))}
      </KeywordsContainer>
    );
  }, [keywords, t]);

  return (
    <>
      <Description>{description}</Description>
      {keywordsText}
    </>
  );
}

const Description = styled(Typography)`
  margin: 0;
`;

const Keywords = styled(Typography)`
  font-style: italic;
`;

const KeywordsContainer = styled.div`
  font-weight: bold;
  margin-top: 0.75em;
`;
