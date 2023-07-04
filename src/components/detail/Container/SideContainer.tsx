import styled from '@emotion/styled';
import { AiOutlineRight } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import Divider from '@mui/material/Divider';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';

import { Wifi, PC, Barbeque, Parking } from './Options';
import { RoomCard } from './RoomCard';
import LocationMap from '../../shared/LocationMap';

import { useRecoilState } from "recoil";
import { activeRoom } from '../../../recoil/detailPageAtoms';


export default function SideContainer() {

  const [activeRecoilCard, setActiveRecoilCard] = useRecoilState(activeRoom)

  const handleCardClick = (cardName: string) => {
    if (activeRecoilCard === null) { setActiveRecoilCard(cardName) }
    else if (activeRecoilCard === cardName) { setActiveRecoilCard(null) }
    else if (activeRecoilCard !== cardName) { setActiveRecoilCard(cardName) }
  };

  const [linelimit, setLineLimit] = useState<number>(3);

  const handleHSeeMore = () => {
    if (linelimit === 3) { setLineLimit(10) } else { setLineLimit(3) }
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
      <HotelDescription linelimit={linelimit}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </HotelDescription>
      <div>
        <SeeMore onClick={handleHSeeMore} disableRipple>
          {linelimit === 3 ? "자세히 보기" : "간략히"} <AiOutlineRight />
        </SeeMore>
      </div>
      <Divider />
      <MainTitle >객실 안내</MainTitle >
      <RoomCardContainer>
        <RoomCard name={"디럭스룸"} doubleBed={1} bedroom={1} shower={1} person={4} price={50000} onClick={() => handleCardClick('디럭스룸')} active={activeRecoilCard === '디럭스룸'} />
        <RoomCard name={"스위트룸"} doubleBed={1} bedroom={2} shower={2} person={6} price={70000} onClick={() => handleCardClick('스위트룸')} active={activeRecoilCard === '스위트룸'} />
        <RoomCard name={"스탠다드룸"} doubleBed={1} bedroom={1} shower={1} person={2} price={60000} onClick={() => handleCardClick('스탠다드룸')} active={activeRecoilCard === '스탠다드룸'} />
      </RoomCardContainer>
      <Divider />
      <MainTitle >위치</MainTitle >
      <div style={{ width: "100%", height: "300px" }}>
        <LocationMap latitude={38.715133} longitude={126.734086} width={"100%"} height={"100%"} />
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


const HotelDescription = styled(Typography) <{ linelimit: number }>`
  margin-top: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ linelimit }) => (linelimit)};
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SeeMore = styled(Button)`
  font-family: Noto Sans KR;
  font-weight: 400;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 30px;
  cursor: pointer;
  color:#acacac;
  &:hover{
    background-color:white;
  }
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

  // const [activeCard, setActiveCard] = useState<string | null>(null);

  // const handleCardClick = (cardName: string) => {
  //   if (activeCard === null) { setActiveCard(cardName) }
  //   else if (activeCard === cardName) { setActiveCard(null) }
  //   else if (activeCard !== cardName) { setActiveCard(cardName) }
  // };