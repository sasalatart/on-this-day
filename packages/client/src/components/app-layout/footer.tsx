import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { USERNAME_URL } from '../../config';
import { Anchor, StyledTheme } from '../common';

export function Footer(): JSX.Element {
  return (
    <Container>
      <Anchor to={USERNAME_URL}>
        <FooterText>@sasalatart</FooterText>
      </Anchor>

      <FooterText>2017-2021</FooterText>
    </Container>
  );
}

const Container = styled.footer`
  ${({ theme }: StyledTheme): string => `
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${theme.palette.primary.main};
    height: 48px;
    padding: 5px 0;
  `}
`;

const FooterText = styled(Typography)`
  ${({ theme }: StyledTheme): string => `
    color: ${theme.palette.primary.contrastText};
  `}
`;
