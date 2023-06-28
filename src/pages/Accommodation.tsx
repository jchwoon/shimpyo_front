import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isPassedState, stepState } from '../recoil/atoms';

import AccommodationHeader from '../components/accommodation/UI/AccommodationHeader';
import AccommodationFooter from '../components/accommodation/UI/AccommodationFooter';
import StartContents from '../components/accommodation/contents/StartContents';
import StepStartContents from '../components/accommodation/contents/StepStartContents';
import AccommodationTypeContents from '../components/accommodation/contents/AccommodationTypeContents';
import AccommodationAddressContents from '../components/accommodation/contents/AccommodationAddressContents';
import AccommodationAddressCheckContents from '../components/accommodation/contents/AccommodationAddressCheckContents';
import AccommodationAmenityInfoContents from '../components/accommodation/contents/AccommodationAmenityInfoContents';
import AccommodationAddPictureContents from '../components/accommodation/contents/AccommodationAddPictureContents';
import AccommodationNameContents from '../components/accommodation/contents/AccommodationNameContents';
import AccommodationDetailContents from '../components/accommodation/contents/AccommodationDetailContents';
import StepFreePass from '../components/accommodation/contents/StepFreePass';
import StepLimitPass from '../components/accommodation/contents/StepLimitPass';
import AccommodationRoomContents from '../components/accommodation/contents/AccommodationRoomContents';

export default function Accommodation() {
  const stepNumber = useRecoilValue(stepState);

  const [isPassed, setIsPassed] = useRecoilState(isPassedState); // isPassed 상태와 설정 함수 추가

  useEffect(() => {
    setIsPassed(false);
  }, [stepNumber]);

  return (
    <StyledContainer>
      <AccommodationHeader />
      <StyledMain>
        {(() => {
          switch (stepNumber) {
            case 0:
              return <StartContents></StartContents>;
            case 1:
              return <StepStartContents step="ONE"></StepStartContents>;
            case 2:
              return <AccommodationTypeContents></AccommodationTypeContents>;
            case 3:
              return <AccommodationAddressContents></AccommodationAddressContents>;
            case 4:
              return <AccommodationAddressCheckContents></AccommodationAddressCheckContents>;
            case 5:
              return <StepStartContents step="TWO"></StepStartContents>;
            case 6:
              return <AccommodationAmenityInfoContents></AccommodationAmenityInfoContents>;
            case 7:
              return <AccommodationAddPictureContents></AccommodationAddPictureContents>;
            case 8:
              return <AccommodationNameContents></AccommodationNameContents>;
            case 9:
              return <AccommodationDetailContents></AccommodationDetailContents>;
            case 10:
              return <StepStartContents step="THR"></StepStartContents>;
            case 11:
              return <AccommodationRoomContents></AccommodationRoomContents>;
            case 12:
              return <StepStartContents step="FOR"></StepStartContents>;
            case 13:
              return <></>;
            case 14:
              return <></>;
            default:
              return null;
          }
        })()}
      </StyledMain>
      <AccommodationFooter />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const StyledMain = styled.main`
  margin: 10px auto;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
