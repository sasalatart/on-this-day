import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { REPO_URL, USERNAME_URL } from '../../config';
import { Anchor, StyledTheme } from '../common';

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

export default function Footer(): JSX.Element {
  return (
    <Container>
      <Anchor to={USERNAME_URL}>
        <FooterText>@sasalatart</FooterText>
      </Anchor>

      <FooterText>2017-2021</FooterText>

      <Anchor to={REPO_URL}>
        <FooterText display="inline">
          <Box display="flex" alignItems="center" gridGap={4}>
            <GitHubIcon htmlColor="white" /> GitHub
          </Box>
        </FooterText>
      </Anchor>
    </Container>
  );
}
