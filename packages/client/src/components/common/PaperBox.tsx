import React from 'react';
import styled from 'styled-components';
import { Paper as MUIPaper, PaperProps } from '@material-ui/core';
import { StyledTheme } from '../common';

const Paper = styled(MUIPaper)`
  ${({ theme }: StyledTheme): string => `
    max-height: 100%;
    max-width: 100%;
    height: auto;
    min-width: 50%;
    padding: 15px;
    margin: 25px 10px;
    ${theme.breakpoints.up('sm')} {
      padding: 25px;
      margin: 25px;
    }
  `}
`;

export default function PaperBox(props: PaperProps): JSX.Element {
  return <Paper elevation={5} {...props} />;
}
