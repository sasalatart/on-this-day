import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import Centered, { CenteredProps } from './Centered';

export default function Spinner(
  props: CircularProgressProps & CenteredProps,
): JSX.Element {
  return (
    <Centered margin={props.margin}>
      <CircularProgress {...props} />
    </Centered>
  );
}
