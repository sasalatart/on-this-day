import React from 'react';
import styled from 'styled-components';
import { Box, CssBaseline } from '@material-ui/core';
import { StyledTheme } from '../common';
import { Footer } from './footer';
import { Header } from './header';

interface Props {
  children: JSX.Element;
}

export function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Box display="flex" flexDirection="column" flex="1">
          {children}
        </Box>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  ${({ theme }: StyledTheme): string => `
    background-color: #dfe6e9;
    display: flex;
    min-height: calc(100vh - 56px - 48px);
    ${theme.breakpoints.up('sm')} {
      min-height: calc(100vh - 64px - 48px);
    }
  `}
`;
