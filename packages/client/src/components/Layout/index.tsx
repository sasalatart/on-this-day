import React from 'react';
import styled from 'styled-components';
import { CssBaseline } from '@material-ui/core';
import { StyledTheme } from '../common';
import Footer from './Footer';
import Header from './Header';

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

const ChildrenContainer = styled.div`
  flex: 1;
`;

type LayoutPropTypes = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutPropTypes): JSX.Element {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <ChildrenContainer>{children}</ChildrenContainer>
      </Container>
      <Footer />
    </>
  );
}
