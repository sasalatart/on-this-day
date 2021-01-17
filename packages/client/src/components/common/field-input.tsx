import React, { ComponentType, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import styled from 'styled-components';

type BaseProps = {
  name: string;
  component?: ComponentType<TextFieldProps>;
} & TextFieldProps;

type Props = BaseProps & { width?: string };

function BaseFieldInput({
  name,
  component = TextField,
  ...rest
}: BaseProps): JSX.Element {
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

export const FieldInput = styled(BaseFieldInput)<Props>`
  width: ${(props: Props): string => props?.width || 'auto'};
`;
