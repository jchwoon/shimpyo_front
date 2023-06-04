import axios, { Axios } from 'axios';
import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import styled from 'styled-components';

export default function SideBox() {
  const [guest, setGuest] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);
  const toggleGuest = () => {
    setGuest(prev => !prev);
    console.log(guest);
  };
  const upAdult = () => {
    setAdultCount(adultCount + 1);
  };
  const downAdult = () => {
    if (adultCount > 0) setAdultCount(adultCount - 1);
  };
  const upKid = () => {
    setKidCount(kidCount + 1);
  };
  const downKid = () => {
    if (kidCount > 0) setKidCount(kidCount - 1);
  };
  const upBaby = () => {
    setBabyCount(babyCount + 1);
  };
  const downBaby = () => {
    if (babyCount > 0) setBabyCount(babyCount - 1);
  };
  return (
    <Main>
      <Text>
        <TotalPrice>₩23,000</TotalPrice>
        <Day>/박</Day>
      </Text>
      <CheckContainer>
        <div style={{ display: 'flex' }}>
          <CheckInOutBox borderRight="1px solid black">
            <CheckTitle>체크인</CheckTitle>
            <CheckDate>2023.06.23</CheckDate>
          </CheckInOutBox>
          <CheckInOutBox>
            <CheckTitle>체크아웃</CheckTitle>
            <CheckDate>2023.06.30</CheckDate>
          </CheckInOutBox>
        </div>
        <People onClick={toggleGuest}>
          <PeopleTitle>인원</PeopleTitle>
          <PeopleDetail>
            <div>게스트 1명</div>
            <div>
              <AiOutlineDown />
            </div>
          </PeopleDetail>
        </People>
        {guest && (
          <GuestCountContainer>
            <GuestEach>
              <GuestType>
                <GuestTitle>성인</GuestTitle>
                <GuestDetail>만 13세 이상</GuestDetail>
              </GuestType>
              <GuestCounting>
                <GuestSet onClick={downAdult}> - </GuestSet>
                <GuestCount> {adultCount} </GuestCount>
                <GuestSet onClick={upAdult}> + </GuestSet>
              </GuestCounting>
            </GuestEach>
            <GuestEach>
              <GuestType>
                <GuestTitle>어린이</GuestTitle>
                <GuestDetail>만 2세 ~ 12세 </GuestDetail>
              </GuestType>
              <GuestCounting>
                <GuestSet onClick={downKid}> - </GuestSet>
                <GuestCount> {kidCount} </GuestCount>
                <GuestSet onClick={upKid}> + </GuestSet>
              </GuestCounting>
            </GuestEach>
            <GuestEach>
              <GuestType>
                <GuestTitle>유아</GuestTitle>
                <GuestDetail>만 2세 미만 </GuestDetail>
              </GuestType>
              <GuestCounting>
                <GuestSet onClick={downBaby}> - </GuestSet>
                <GuestCount> {babyCount} </GuestCount>
                <GuestSet onClick={upBaby}> + </GuestSet>
              </GuestCounting>
            </GuestEach>
            <GuestCLose onClick={toggleGuest}>닫기</GuestCLose>
          </GuestCountContainer>
        )}
      </CheckContainer>

      <BookingBtn>예약 가능 여부 보기</BookingBtn>
    </Main>
  );
}

const Main = styled.div`
  position: sticky;
  width: calc(30%);
  height: 310px;
  top: 48px;
  /* border: 1px solid black; */
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 42px;
`;
const Text = styled.div`
  margin-bottom: 24px;
`;

const TotalPrice = styled.span`
  font-weight: 600;
  font-size: 22px;
`;

const Day = styled.span`
  font-weight: 400;
  font-size: 16px;
`;

const CheckContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid black;
  border-radius: 12px;
`;

interface ICheckInOutBox {
  borderRight?: string;
}

const CheckInOutBox = styled.div<ICheckInOutBox>`
  width: 50%;
  border-right: ${p => p.borderRight ?? ''};
  position: relative;
`;
const CheckTitle = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
`;

const CheckDate = styled.div`
  padding: 26px 12px 10px 12px;
`;

const People = styled.div`
  position: relative;
  width: 100%;
`;
const PeopleTitle = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
`;

const PeopleDetail = styled.div`
  display: flex;
  padding: 26px 12px 10px 12px;
  border-top: 1px solid black;
  justify-content: space-between;
`;

const BookingBtn = styled.div`
  background-color: red;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  margin: 20px auto;
  cursor: pointer;
`;

const GuestCountContainer = styled.div`
  position: absolute;
  left: -10px;
  padding: 16px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  width: 95%;
`;
const GuestEach = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const GuestType = styled.div``;
const GuestTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const GuestDetail = styled.div`
  font-size: 14px;
`;
const GuestCounting = styled.div`
  display: flex;
  align-items: center;
`;

const GuestSet = styled.div`
  border: 1px solid black;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  font-weight: 700;
  cursor: pointer;
`;
const GuestCount = styled.div`
  margin: 0 12px;
`;

const GuestCLose = styled.div`
  text-decoration: underline;
  font-size: 18px;
  text-align: end;
  font-weight: 700;
  cursor: pointer;
`;
