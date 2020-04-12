import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons, REPO_URL, USERNAME_URL } from '../../config';
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

const RepoText = styled(FooterText)`
  margin-left: 5px;
`;

export default function Footer(): JSX.Element {
  return (
    <Container>
      <Anchor to={USERNAME_URL}>
        <FooterText>@sasalatart</FooterText>
      </Anchor>

      <FooterText>2017-2020</FooterText>

      <Anchor to={REPO_URL}>
        <FontAwesomeIcon icon={icons.github} color="white" />
        <RepoText display="inline">GitHub</RepoText>
      </Anchor>
    </Container>
  );
}
