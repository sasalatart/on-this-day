import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { Box, Button, MenuItem } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { MONTHS, TODAY, dayOfMonthSchema } from '@on-this-day/shared';
import { FieldInput, StyledTheme } from '../common';

interface Props {
  onSubmit: ({ day, month }: typeof TODAY) => void | Promise<void>;
}

export function DateSelectForm({ onSubmit }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={TODAY}
      onSubmit={onSubmit}
      validationSchema={dayOfMonthSchema}
    >
      {({ isSubmitting, isValid }): JSX.Element => (
        <Container>
          <Box display="flex" padding="5px">
            <FieldInput
              name="day"
              label={t('dates.day')}
              type="number"
              width="5em"
            />

            <FieldInput
              name="month"
              label={t('dates.month')}
              width="9em"
              select
            >
              {MONTHS.map((option) => (
                <MenuItem key={option.number} value={option.number}>
                  {option.name}
                </MenuItem>
              ))}
            </FieldInput>
          </Box>

          <Submit
            id="submit-search"
            type="submit"
            disabled={isSubmitting || !isValid}
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            {t('dateSelect.search')}
          </Submit>
        </Container>
      )}
    </Formik>
  );
}

const Container = styled(Form)`
  ${({ theme }: StyledTheme): string => `
    display: block;
    ${theme.breakpoints.up('sm')} {
      display: flex;
      align-items: baseline;
    }
  `}
`;

const Submit = styled(Button)`
  display: flex;
  width: 100%;
`;
