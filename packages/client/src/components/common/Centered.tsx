import styled from 'styled-components';

export type CenteredProps = {
  margin?: string;
};

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }: CenteredProps): string => margin || '0'};
`;
