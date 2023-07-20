import styled from 'styled-components';
import SideContainer from './SideContainer';
import BottomContainer from './BottomContainer';
import NewSideBox from '../sideBox/NewSideBox';
import { Dispatch, SetStateAction } from 'react';

interface MainContainerProps {
  houseName: string,
  houseContents: string;
  options: Array<string>;
  rooms: Array<Object>;
  lat: number;
  lng: number;
  reviewData?: Array<Object>;
  reviewIsLoading: boolean;
  houseId: string;
  setAlertOpen: Dispatch<SetStateAction<boolean>>
  setAlertMessage: Dispatch<SetStateAction<string>>
}

export default function MainContainer({ houseName, houseContents, options, rooms, lat, lng, reviewData, reviewIsLoading, houseId, setAlertOpen, setAlertMessage }: MainContainerProps) {
  return (
    <>
      <Main>
        <SideContainer houseContents={houseContents} options={options} rooms={rooms} lat={lat} lng={lng} />
        <NewSideBox houseName={houseName} houseId={houseId} setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage} />
      </Main>
      <BottomContainer reviewData={reviewData} reviewIsLoading={reviewIsLoading} />
    </>
  );
}

const Main = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-top: 48px;
  @media screen and (max-width: 750px){
    flex-direction: column;
  };
`;
