import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { months, today, validationsSchemas } from '@on-this-day/shared';
import { Input, InputProps, SubmitButton } from '../common';

const Fields = styled(Form)`
  display: flex;
  align-items: baseline;
  * {
    margin: 5px;
  }
`;

type FieldInputProps = { width: string } & InputProps;

const FieldInput = styled(Input)<FieldInputProps>`
  width: ${(props: FieldInputProps): string => props.width};
`;

type DateSelectFormProps = {
  handleSubmit: ({ day, month }: typeof today) => void | Promise<void>;
};

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
      <Fields>
        <FieldInput
          name="day"
          label={t('dates.day')}
          type="number"
          width="6em"
        />

        <FieldInput name="month" label={t('dates.month')} width="9em" select>
          {months.map((option: typeof months[0]) => (
            <MenuItem key={option.number} value={option.number}>
              {option.name}
            </MenuItem>
          ))}
        </FieldInput>

        <SubmitButton
          id="submit-search"
          icon="search"
          aria-label={t('dateSelect.search')}
          color="primary"
        />
      </Fields>
    </Formik>
  );
}
