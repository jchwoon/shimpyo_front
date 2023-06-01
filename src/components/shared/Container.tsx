import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps): JSX.Element {
  return <ContainerBox>{children}</ContainerBox>;
}

const ContainerBox = styled.div`
  width: auto;
  margin: 0 1rem;

  @media only screen and (min-width: 640px) {
    margin: 0 1rem;
  }
  @media only screen and (min-width: 768px) {
    margin: 0 2rem;
  }
  @media only screen and (min-width: 1280px) {
    margin: 0 5rem;
  }
`;
