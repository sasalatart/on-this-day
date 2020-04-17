import React from 'react';
import styled from 'styled-components';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons, REPO_URL } from '../../config';
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
        <Button
          color="inherit"
          startIcon={<FontAwesomeIcon icon={icons.github} color="white" />}
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
}
