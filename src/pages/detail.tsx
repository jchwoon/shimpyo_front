import styled from 'styled-components';

export default function Detail() {
  return (
    <>
      <TempTopBar />
      <Container>
        <Title>넓고 푸른 바다를 바라보며 수영을 즐기고 온전한 휴식을 취할 수 있는 숙소의 풀빌라B</Title>
        <Description></Description>
      </Container>
    </>
  );
}

const TempTopBar = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid black;
`;

const Container = styled.div`
  width: 1280px;
  height: auto;
  padding: 0 80px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin-top: 24px;
`;

const Description = styled.div`
  width: 100px;
`;
