import styled from 'styled-components';
import Container from '../Container';

export default function Main({}) {
  return (
    <Container>
      <StyleMainBox>
        <div>채운님 안녕하세요</div>
      </StyleMainBox>
    </Container>
  );
}

const StyleMainBox = styled.main`
  width: 100%;
  height: 200vh;
`;
