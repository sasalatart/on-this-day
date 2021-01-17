import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import { TODAY } from '@on-this-day/shared';
import { WIKI_URL } from '../../config';
import { routes } from '../../routes';
import { Anchor, PaperBox } from '../common';
import { DateSelectForm } from './form';

export function DateSelect(): JSX.Element {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    ({ day, month }: typeof TODAY) => {
      push(routes.yearDate(day, month));
    },
    [push],
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <PaperBox>
        <Typography
          id="date-select-title"
          variant="h3"
          align="center"
          gutterBottom
        >
          {t('dateSelect.instructions')}
        </Typography>

        <Typography variant="h4" align="center" gutterBottom>
          <Anchor to={WIKI_URL}>{t('dateSelect.source')}</Anchor>
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="25px"
        >
          <DateSelectForm onSubmit={handleSubmit} />
        </Box>
      </PaperBox>
    </Box>
  );
}
