import React, { ComponentType, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

type InputProps = {
  name: string;
  component?: ComponentType<TextFieldProps>;
} & TextFieldProps;

export default function Input({
  name,
  component = TextField,
  ...rest
}: InputProps): JSX.Element {
  const { t } = useTranslation();
  const [{ value, onBlur, onChange }, { error, touched }] = useField(name);

  const props = useMemo(
    () => ({
      id: name,
      name,
      value,
      error: touched ? !!error : undefined,
      helperText: touched && error ? t(error) : undefined,
      onBlur,
      onChange,
      ...rest,
    }),
    [error, name, onBlur, onChange, rest, t, touched, value],
  );

  const Component = component;
  return <Component {...props} />;
}
