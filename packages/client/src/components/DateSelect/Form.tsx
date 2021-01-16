import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { Button, MenuItem } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { months, today, validationsSchemas } from '@on-this-day/shared';
import { Input, InputProps, StyledTheme } from '../common';

type DateSelectFormProps = {
  handleSubmit: ({ day, month }: typeof today) => void | Promise<void>;
};

type FieldInputProps = { width: string } & InputProps;

const Container = styled(Form)`
  ${({ theme }: StyledTheme): string => `
    display: block;
    ${theme.breakpoints.up('sm')} {
      display: flex;
      align-items: baseline;
    }
  `}
`;

const Fields = styled.div`
  display: flex;
  * {
    margin: 5px;
  }
`;

const FieldInput = styled(Input)<FieldInputProps>`
  width: ${(props: FieldInputProps): string => props.width};
`;

const Submit = styled(Button)`
  display: flex;
  width: 100%;
`;

export default function DateSelectForm({
  handleSubmit,
}: DateSelectFormProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={today}
      onSubmit={handleSubmit}
      validationSchema={validationsSchemas.dayOfMonth}
    >
      {({ isSubmitting, isValid }) => (
        <Container>
          <Fields>
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
              {months.map((option: typeof months[0]) => (
                <MenuItem key={option.number} value={option.number}>
                  {option.name}
                </MenuItem>
              ))}
            </FieldInput>
          </Fields>

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
