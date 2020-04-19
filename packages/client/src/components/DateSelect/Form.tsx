import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { months, today, validationsSchemas } from '@on-this-day/shared';
import { Input, SubmitButton } from '../common';

const Fields = styled(Form)`
  display: flex;
  align-items: baseline;
  * {
    margin: 5px;
  }
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
        <Input name="day" label={t('dates.day')} type="number" />

        <Input name="month" label={t('dates.month')} select>
          {months.map((option: typeof months[0]) => (
            <MenuItem key={option.number} value={option.number}>
              {option.name}
            </MenuItem>
          ))}
        </Input>

        <SubmitButton id="submit-search" icon="search" color="primary">
          {t('dateSelect.search')}
        </SubmitButton>
      </Fields>
    </Formik>
  );
}
