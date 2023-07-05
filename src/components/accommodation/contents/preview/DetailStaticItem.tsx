import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';

import ImageContainer from './component/ImageContainer';
import MainContainer from './component/MainContainer';

import { useRecoilValue } from 'recoil';
import { accommodationState } from '../../../../recoil/accommodationAtoms';

export default function DetailStaticItem() {
  const accommodation = useRecoilValue(accommodationState);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CssBaseline />
      <Container>
        <Description>
          <TitleWrapper>
            <Title>{accommodation.name}</Title>
            <DescriptionLocation>{accommodation.address.fullAddress}</DescriptionLocation>
          </TitleWrapper>
        </Description>
        <ImageContainer />
        <MainContainer />
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 1220px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 749px) {
    padding: 10px 24px 0px 24px;
    width: 100%;
  }
  @media screen and (max-width: 599px) {
    padding: 10px 16px 0px 16px;
    width: 100%;
  }
`;

const TitleWrapper = styled.div``;

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  font-family: 'Noto Sans KR';
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DescriptionLocation = styled.div`
  text-decoration: underline;
`;
