import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

type LinkProps = {
  children: JSX.Element | JSX.Element[] | string;
  to: string;
};

export const Link = styled(ReactLink)`
  font-weight: bold;
  text-decoration: none;
`;

const CustomAnchor = styled.a`
  font-weight: bold;
  text-decoration: none;
`;

export function Anchor({ to, children }: LinkProps): JSX.Element {
  return (
    <CustomAnchor target="_blank" rel="noopener noreferrer" href={to}>
      {children}
    </CustomAnchor>
  );
}
