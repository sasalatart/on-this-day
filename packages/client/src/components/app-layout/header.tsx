import React from 'react';
import styled from 'styled-components';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { REPO_URL } from '../../config';
import { Link, StyledTheme } from '../common';

export function Header(): JSX.Element {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h6">
          <Link id="brand" to="/">
            On This Day
          </Link>
        </Title>
        <Button
          color="inherit"
          startIcon={<GitHubIcon htmlColor="white" />}
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

const Title = styled(Typography)`
  ${({ theme }: StyledTheme): string => `
    flex-grow: 1;
    a {
      color: ${theme.palette.primary.contrastText};
    }
  `}
`;
