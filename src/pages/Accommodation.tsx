import styled from 'styled-components';
import AccommodationAddressContents from '../components/accommodation/contents/AccommodationAddressContents';
import AccommodationCountInfoContents from '../components/accommodation/contents/AccommodationCountInfoContents';
import AccommodationAmenityInfoContents from '../components/accommodation/contents/AccommodationAmenityInfoContents';
import AccommodationAddPictureContents from '../components/accommodation/contents/AccommodationAddPictureContents';
import StartContents from '../components/accommodation/contents/StartContents';
import RoomTypeContents from '../components/accommodation/contents/RoomTypeContents';
import LocationMap from '../components/accommodation/contents/LocationMap';
import AccommodationTypeContents from '../components/accommodation/contents/AccommodationTypeContents';
import StepBar from '../components/accommodation/StepBar';

export default function Accommodation() {
  return (
    <Test>
      <br></br>
      <br></br>
      <br></br>
      <StepBar />
      <br></br>
      <StartContents></StartContents>
      <br></br>
      <br></br>
      <br></br>
      <AccommodationTypeContents />
      <br></br>
      <br></br>
      <br></br>
      <RoomTypeContents />
      <br></br>
      <br></br>
      <br></br>
      <LocationMap longitude={128.6402609} latitude={35.2538433} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <AccommodationCountInfoContents />
      <br></br>
      <br></br>
      <AccommodationAddressContents />
      <br></br>
      <AccommodationAmenityInfoContents />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <AccommodationAddPictureContents />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Test>
  );
}

const Test = styled.div`
  /* background-color: rgba(0, 0, 0, 0.5); */
  height: 1000px;
`;
