import styled from '@emotion/styled';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

import { Wifi, PC, Barbeque, Parking } from './Options';
import { RoomCard } from './RoomCard';
import LocationMap from '../../shared/LocationMap';

import { useRecoilState } from "recoil";
import { activeRoom } from '../../../recoil/detailPageAtoms';

import HotelDescription from './HotelDescription';

interface SideContainerProps {
  houseContents: string;
  options: Array<string>;
  rooms: Array<any>;
  lat: number;
  lng: number;
}

export default function SideContainer({ houseContents, options, rooms, lat, lng }: SideContainerProps) {

  const [activeRecoilCard, setActiveRecoilCard] = useRecoilState(activeRoom)

  const handleCardClick = (cardName: string) => {
    if (activeRecoilCard === null) { setActiveRecoilCard(cardName) }
    else if (activeRecoilCard === cardName) { setActiveRecoilCard(null) }
    else if (activeRecoilCard !== cardName) { setActiveRecoilCard(cardName) }
  };

  return (
    <Container>
      <OptionContainer>
        {options.includes("wifi") ? <Wifi /> : null}
        {options.includes("pc") ? <PC /> : null}
        {options.includes("bbq") ? <Barbeque /> : null}
        {options.includes("parking") ? <Parking /> : null}
      </OptionContainer>
      <Divider />
      <HotelDescription houseContents={houseContents} />
      <Divider />
      <MainTitle >객실 안내</MainTitle >
      <RoomCardContainer>
        {rooms.map((room, index) =>
          <RoomCard
            key={index}
            image={room.roomImages}
            name={room.name}
            doubleBed={room.bedCount}
            bedroom={room.bedroomCount}
            shower={room.bathroomCount}
            minPerson={room.minPeople}
            maxPerson={room.maxPeople}
            checkInTime={room.checkIn}
            checkOutTime={room.checkOut}
            price={room.price}
            onClick={() => handleCardClick(room.name)}
            active={activeRecoilCard === room.name} />)
        }
      </RoomCardContainer>
      <Divider />
      <MainTitle >위치</MainTitle >
      <div style={{ width: "100%", height: "300px" }}>
        <LocationMap latitude={lat} longitude={lng} width={"100%"} height={"100%"} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 60%;
  height: auto;
  @media screen and (max-width: 750px){
    width:100%;
    // padding: 0 20px;
  };
`;

const OptionContainer = styled.div`
display:flex;
flex-direction:row;
margin-bottom:30px;
flex-wrap:wrap;
`

const RoomCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
`;

const MainTitle = styled(Typography)`
  padding: 30px 0 24px 0;
  font-size: 22px;
  font-weight: 600;
  font-family: Noto Sans KR;
`;

  // const [activeCard, setActiveCard] = useState<string | null>(null);

  // const handleCardClick = (cardName: string) => {
  //   if (activeCard === null) { setActiveCard(cardName) }
  //   else if (activeCard === cardName) { setActiveCard(null) }
  //   else if (activeCard !== cardName) { setActiveCard(cardName) }
  // };