import React from 'react';
import { useFormikContext } from 'formik';
import styled from 'styled-components';
import { Button, ButtonProps } from '@material-ui/core';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

type Icon = FontAwesomeIconProps['icon'];

type SubmitButtonProps = {
  children: JSX.Element;
  icon: Icon;
} & ButtonProps;

const ChildrenContainer = styled.span`
  margin-left: 5px;
`;

export default function SubmitButton({
  children,
  icon,
  variant = 'contained',
  ...rest
}: SubmitButtonProps): JSX.Element {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <Button
      disabled={isSubmitting || !isValid}
      type="submit"
      variant={variant}
      {...rest}
    >
      {isSubmitting ? (
        <FontAwesomeIcon icon="spinner" spin />
      ) : (
        <FontAwesomeIcon icon={icon} />
      )}
      <ChildrenContainer>{children}</ChildrenContainer>
    </Button>
  );
}
