import React from 'react';
import { useFormikContext } from 'formik';
import { Button, ButtonProps, IconButtonProps } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

type Icon = FontAwesomeIconProps['icon'];

type SubmitButtonProps = {
  children: JSX.Element;
  icon?: Icon;
} & (ButtonProps & IconButtonProps);

function renderIcon(
  isSubmitting: boolean,
  color: string,
  icon?: Icon,
): JSX.Element | null {
  const iconProps = {
    color,
    spin: isSubmitting,
  };

  if (isSubmitting) {
    return <FontAwesomeIcon icon="spinner" {...iconProps} />;
  }

  if (!icon) return null;

  return <FontAwesomeIcon icon={icon} {...iconProps} />;
}

export default function SubmitButton({
  children,
  icon,
  variant = 'contained',
  ...rest
}: SubmitButtonProps): JSX.Element {
  const { isSubmitting, isValid } = useFormikContext();
  const theme = useTheme();

  return (
    <Button
      variant={variant}
      disabled={isSubmitting || !isValid}
      size="small"
      type="submit"
      {...rest}
    >
      {renderIcon(isSubmitting, theme.palette.primary.contrastText, icon)}
      {children}
    </Button>
  );
}
