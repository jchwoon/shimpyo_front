import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import ImageContainer from '../components/detail/ImageContainer';
import MainContainer from '../components/detail/MainContainer';
export default function Detail() {
  return (
    <>
      <TempTopBar />
      <Container>
        <Title>넓고 푸른 바다를 바라보며 수영을 즐기고 온전한 휴식을 취할 수 있는 숙소의 풀빌라B</Title>
        <Description>
          <Description_location>Seo-myeon, Namhae, 경상남도, 한국</Description_location>
          <Description_like>
            <AiFillHeart /> 저장
          </Description_like>
        </Description>
        <ImageContainer />
        <MainContainer />
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
  padding: 0 60px;
  max-width: 1120px;
  min-width: 800px;
  margin: 0 auto;
  @media screen and (max-width: 900px){
    padding: 0px;
    width: 100%;
    min-width: 0;
  };
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin-top: 24px;
  @media screen and (max-width: 900px){
    padding: 0 20px;
  };
`;

const Description = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  @media screen and (max-width: 900px){
    padding: 0 20px;
  };
`;

const Description_location = styled.div`
  width: auto;
  text-decoration: underline;
`;
const Description_like = styled.div`
  font-weight: bold;
`;
