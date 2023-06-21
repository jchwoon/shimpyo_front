import styled from '@emotion/styled';
import { AiOutlineRight } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import Divider from '@mui/material/Divider';
import { Typography, Card } from '@mui/material';
import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';

import { Wifi, PC, Barbeque, Parking } from './Options';
import { RoomCard } from './RoomCard';

export default function SideContainer() {

  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (cardName: string) => {
    setActiveCard(cardName);
  };

  const [lineLimit, setLineLimit] = useState<number>(3);

  const handleHSeeMore = () => {
    if (lineLimit === 3) { setLineLimit(10) } else { setLineLimit(3) }
  }
  return (
    <Container>
      <OptionContainer>
        <Wifi />
        <PC />
        <Barbeque />
        <Parking />
      </OptionContainer>
      <Divider />
      <HotelDescription lineLimit={lineLimit}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </HotelDescription>
      <SeeMore onClick={handleHSeeMore}>
        {lineLimit === 3 ? "더보기" : "줄이기"} <AiOutlineRight />
      </SeeMore>
      <Divider />
      <MainTitle >객실 안내</MainTitle >

      <RoomCardContainer>
        <RoomCard name={"디럭스룸"} doubleBed={1} bedroom={1} shower={1} person={4} price={50000} onClick={() => handleCardClick('디럭스룸')} active={activeCard === '디럭스룸'} />
        <RoomCard name={"스위트룸"} doubleBed={1} bedroom={2} shower={2} person={6} price={70000} onClick={() => handleCardClick('스위트룸')} active={activeCard === '스위트룸'} />
        <RoomCard name={"스탠다드룸"} doubleBed={1} bedroom={1} shower={1} person={2} price={60000} onClick={() => handleCardClick('스탠다드룸')} active={activeCard === '스탠다드룸'} />
      </RoomCardContainer>

      <Divider />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 60%;
  height: auto;
  @media screen and (max-width: 900px){
    width: calc(100% - 40px);
    padding: 0 20px;
  };
`;

const OptionContainer = styled.div`
display:flex;
flex-direction:row;
margin-bottom:30px;
`


const HotelDescription = styled(Typography) <{ lineLimit: number }>`
  margin-top: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lineLimit }) => (lineLimit)};
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SeeMore = styled.div`
  // text-decoration: underline;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  padding-bottom: 30px;
  cursor: pointer;
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

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RoomIcon = styled.div`
  margin-bottom: 14px;
  font-size: 24px;
`;

const RoomIconTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const RoomIconDetail = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

const FacilityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FacilityText = styled.div`
  margin-bottom: 14px;
  display: flex;
  text-align: center;
  align-items: center;
  width: 50%;
`;

const ShowAllBtn = styled.div`
  border-radius: 8px;
  margin-top: 12px;
  margin-bottom: 48px;
  padding: 13px 23px;
  border: 1px solid black;
  width: 180px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
