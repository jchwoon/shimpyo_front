import styled from 'styled-components';
import Container from '../shared/Container';

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <Container>
      <StyleMainBox>{children}</StyleMainBox>
    </Container>
  );
}

const StyleMainBox = styled.main`
  width: 100%;
  height: auto;
`;
