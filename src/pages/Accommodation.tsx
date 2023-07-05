import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { stepState } from '../recoil/accommodationAtoms';

import AccommodationHeader from '../components/accommodation/UI/AccommodationHeader';
import AccommodationFooter from '../components/accommodation/UI/AccommodationFooter';
import StartContents from '../components/accommodation/contents/start/StartContents';
import StepStartContents from '../components/accommodation/contents/start/StepStartContents';
import AccommodationTypeContents from '../components/accommodation/contents/type/AccommodationTypeContents';
import AccommodationAddressContents from '../components/accommodation/contents/address/AccommodationAddressContents';
import AccommodationAddressCheckContents from '../components/accommodation/contents/address/AccommodationAddressCheckContents';
import AccommodationAmenityInfoContents from '../components/accommodation/contents/amenity/AccommodationAmenityInfoContents';
import AccommodationAddPictureContents from '../components/accommodation/contents/picture/AccommodationAddPictureContents';
import AccommodationNameContents from '../components/accommodation/contents/text/AccommodationNameContents';
import AccommodationDetailContents from '../components/accommodation/contents/text/AccommodationDetailContents';
import AccommodationRoomContents from '../components/accommodation/contents/room/AccommodationRoomContents';
import { slideUp } from '../components/accommodation/animation/slideUp';
import DetailStaticContents from '../components/accommodation/contents/preview/DetailStaticContents';
import AccommodationCompleteContents from '../components/accommodation/contents/complete/AccommodationCompleteContents';

export default function Accommodation() {
  const stepNumber = useRecoilValue(stepState);

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
              return <DetailStaticContents></DetailStaticContents>;
            case 14:
              return <AccommodationCompleteContents></AccommodationCompleteContents>;
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
  padding: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  > * {
    opacity: 0;
    animation: ${slideUp} 0.9s ease-in-out forwards;
  }

  @media (min-width: 780px) {
    margin: 10px auto;
  }
`;
