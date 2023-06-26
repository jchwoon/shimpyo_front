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

  @media only screen and (min-width: 640px) {
    padding: 0 1rem;
  }
  @media only screen and (min-width: 768px) {
    padding: 0 3rem;
  }
  @media only screen and (min-width: 1080px) {
    padding: 0 5rem;
  }
`;
