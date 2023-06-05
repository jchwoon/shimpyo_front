import axios, { Axios } from 'axios';
import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import styled from 'styled-components';
import Guest from './Guest';
import SideCalender from './Calender';

export default function SideBox() {
  const [guest, setGuest] = useState(false);
  const [guestCount, setGuestCount] = useState([0,0,0])
  
  const guestChange = (label:string) => {
    if(label==="adultUp"){
      setGuestCount(prevState=>{
        const newState = [...prevState]
        newState[0] +=1;
        return newState
      })
    }
    if(label==='adultDown' && guestCount[0]>0){
      setGuestCount(prevState=>{
        const newState = [...prevState]
        newState[0] -=1;
        return newState
      })
    }
    if(label==="kidUp"){
      setGuestCount(prevState=>{
        const newState = [...prevState]
        newState[1] +=1;
        return newState
      })
    }
    if(label==='kidDown' && guestCount[1]>0){
      setGuestCount(prevState=>{
        const newState = [...prevState]
        newState[1] -=1;
        return newState
      })
    }
    if(label==="babyUp"){
      setGuestCount(prevState=>{
        const newState = [...prevState]
        newState[2] +=1;
        return newState
      })
    }
    if(label==='babyDown' && guestCount[2]>0){
      setGuestCount(prevState=>{
        const newState = [...prevState]
        newState[2] -=1;
        return newState
      })
    }


  }
  const toggleGuest = () => {
    setGuest(prev => !prev);
    console.log(guest);
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
        {
          guest && 
          <Guest 
            guestCount={guestCount} 
            guestChange={guestChange}
            toggleGuest={toggleGuest}
          />
        }
        <SideCalender />
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
