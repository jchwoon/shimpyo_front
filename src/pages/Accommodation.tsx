import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { stepState } from '../recoil/atoms';

import AccommodationHeader from '../components/accommodation/UI/AccommodationHeader';
import AccommodationFooter from '../components/accommodation/UI/AccommodationFooter';
import StartContents from '../components/accommodation/contents/StartContents';
import StepStartContents from '../components/accommodation/contents/StepStartContents';
import AccommodationTypeContents from '../components/accommodation/contents/AccommodationTypeContents';
import AccommodationAddressContents from '../components/accommodation/contents/AccommodationAddressContents';
import AccommodationAddressCheckContents from '../components/accommodation/contents/AccommodationAddressCheckContents';
import AccommodationCountInfoContents from '../components/accommodation/contents/AccommodationCountInfoContents';
import AccommodationAmenityInfoContents from '../components/accommodation/contents/AccommodationAmenityInfoContents';
import AccommodationAddPictureContents from '../components/accommodation/contents/AccommodationAddPictureContents';
import AccommodationNameContents from '../components/accommodation/contents/AccommodationNameContents';
import AccommodationDetailContents from '../components/accommodation/contents/AccommodationDetailContents';
import AccommodationFeeContents from '../components/accommodation/contents/AccommodationFeeContents';
import LocationMap from '../components/accommodation/contents/LocationMap';

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
              return <></>;
            case 5:
              return <AccommodationAddressCheckContents></AccommodationAddressCheckContents>;
            case 6:
              return <AccommodationCountInfoContents></AccommodationCountInfoContents>;
            case 7:
              return <StepStartContents step="TWO"></StepStartContents>;
            case 8:
              return <AccommodationAmenityInfoContents></AccommodationAmenityInfoContents>;
            case 9:
              return <AccommodationAddPictureContents></AccommodationAddPictureContents>;
            case 10:
              return <AccommodationNameContents></AccommodationNameContents>;
            case 11:
              return <AccommodationDetailContents></AccommodationDetailContents>;
            case 12:
              return <AccommodationFeeContents></AccommodationFeeContents>;
            case 13:
              return <StepStartContents step="THR"></StepStartContents>;
            case 14:
              return <StepStartContents step="FOR"></StepStartContents>;
            case 15:
              return (
                <LocationMap
                  latitude={37.5642135}
                  longitude={127.0016985}
                  width={'500px'}
                  height={'400px'}
                ></LocationMap>
              );
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
