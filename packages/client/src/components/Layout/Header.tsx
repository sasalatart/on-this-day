import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, StyledTheme } from '../common';

const Title = styled(Typography)`
  ${({ theme }: StyledTheme): string => `
    flex-grow: 1;
    a {
      color: ${theme.palette.primary.contrastText};
    }
  `}
`;

export default function Header(): JSX.Element {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h6">
          <Link to="/">On This Day</Link>
        </Title>
      </Toolbar>
    </AppBar>
  );
}
