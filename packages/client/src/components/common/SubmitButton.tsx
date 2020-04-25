import React from 'react';
import { useFormikContext } from 'formik';
import { Button, ButtonProps } from '@material-ui/core';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

type Icon = FontAwesomeIconProps['icon'];

type SubmitButtonProps = {
  icon: Icon;
  'aria-label': string;
} & ButtonProps;

export default function SubmitButton({
  icon,
  variant = 'contained',
  ...rest
}: SubmitButtonProps): JSX.Element {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <Button
      disabled={isSubmitting || !isValid}
      size="small"
      type="submit"
      variant={variant}
      {...rest}
    >
      {isSubmitting ? (
        <FontAwesomeIcon icon="spinner" spin />
      ) : (
        <FontAwesomeIcon icon={icon} />
      )}
    </Button>
  );
}
