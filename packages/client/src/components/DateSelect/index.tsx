import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { today } from '@on-this-day/shared';
import { WIKI_URL } from '../../config';
import routes from '../../routes';
import { Anchor, Centered, PaperBox } from '../common';
import Form from './Form';

const Container = styled(Centered)`
  height: 100%;
`;

const FormContainer = styled(Centered)`
  margin-top: 25px;
`;

export default function DateSelect(): JSX.Element {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    ({ day, month }: typeof today) => {
      push(routes.episodes(day, month));
    },
    [push],
  );

  return (
    <Container>
      <PaperBox>
        <Typography variant="h3" align="center" gutterBottom>
          {t('dateSelect.instructions')}
        </Typography>

        <Typography variant="h4" align="center" gutterBottom>
          <Anchor to={WIKI_URL}>{t('dateSelect.source')}</Anchor>
        </Typography>

        <FormContainer>
          <Form handleSubmit={handleSubmit} />
        </FormContainer>
      </PaperBox>
    </Container>
  );
}
