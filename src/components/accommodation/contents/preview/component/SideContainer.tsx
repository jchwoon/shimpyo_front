import styled from '@emotion/styled';
import { AiOutlineRight } from 'react-icons/ai';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useState } from 'react';

import { Wifi, PC, Barbeque, Parking } from '../../../../detail/Container/Options';
import { RoomCard } from './RoomCard';
import LocationMap from '../../../../shared/LocationMap';
import { useRecoilValue } from 'recoil';
import { accommodationState } from '../../../../../recoil/accommodationAtoms';

export default function SideContainer() {
  const accommodation = useRecoilValue(accommodationState);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (cardName: string) => {
    setActiveCard(cardName);
  };

  const [linelimit, setLineLimit] = useState<number>(3);

  const handleHSeeMore = () => {
    if (linelimit === 3) {
      setLineLimit(10);
    } else {
      setLineLimit(3);
    }
  };
  return (
    <Container>
      <OptionContainer>
        {accommodation.option.wifi && <Wifi />}
        {accommodation.option.pc && <PC />}
        {accommodation.option.bbq && <Barbeque />}
        {accommodation.option.parking && <Parking />}
      </OptionContainer>
      <Divider />
      <HotelDescription linelimit={linelimit}>{accommodation.contents}</HotelDescription>
      <SeeMore onClick={handleHSeeMore}>
        {linelimit === 3 ? '자세히 보기' : '간략히'} <AiOutlineRight />
      </SeeMore>
      <Divider />
      <MainTitle>객실 안내</MainTitle>
      <RoomCardContainer>
        {accommodation.rooms.map((room, idx) => {
          return (
            <RoomCard
              key={`room ${idx}`}
              name={room.name}
              doubleBed={room.bedCount}
              bedroom={room.bedroomCount}
              shower={room.bathroomCount}
              person={room.maxPeople}
              price={room.price}
              onClick={() => handleCardClick(room.name)}
              active={activeCard === room.name}
              idx={idx}
            />
          );
        })}
      </RoomCardContainer>
      <Divider />
      <MainTitle>위치</MainTitle>
      <LocationMap
        latitude={accommodation.address.lat}
        longitude={accommodation.address.lng}
        width={'100%'}
        height={'300px'}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 60%;
  height: auto;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const HotelDescription = styled(Typography) <{ linelimit: number }>`
  margin-top: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ linelimit }) => linelimit};
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SeeMore = styled(Typography)`
  font-family: Noto Sans KR;
  font-weight: 400;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  padding-bottom: 30px;
  cursor: pointer;
  color: #acacac;
`;

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
