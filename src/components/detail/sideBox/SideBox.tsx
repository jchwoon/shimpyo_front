import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styled from 'styled-components';
import Guest from './Guest';
import moment from 'moment';
import 'moment/locale/ko';
import { Typography } from '@mui/material';

import { useRecoilValue, useRecoilState } from "recoil";
import {
  activeRoomPrice,
  activeRoomName,
  FirstPickedDate,
  SecondPickedDate,
  AdultGuest,
  ChildGuest,
  InfantGuest,
} from '../../../recoil/atoms';

import { CustomizedMenu } from '../Navbar/Navbar.styled';
import { Calendar } from '../Calendar/Calendar';

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from '../Navbar/GuestCount';
import { Divider } from '@mui/material';

export default function SideBox() {
  const [guest, setGuest] = useState(false);
  const [guestCount, setGuestCount] = useState([0, 0, 0]);
  const [startDate, setStartDate] = useState('날짜 추가');
  const [endDate, setEndDate] = useState('날짜 추가');
  const [calendar, setCalendar] = useState(false);
  const [booking, setBooking] = useState(true);

  const price = useRecoilValue(activeRoomPrice)
  const Name = useRecoilValue(activeRoomName)
  const firstPickedDate = useRecoilValue(FirstPickedDate)
  const secondPickedDate = useRecoilValue(SecondPickedDate)

  /** 게스트의 연령층, 인원수를 바꿔주는 함수*/
  const guestChange = (label: string) => {
    if (label === 'adultUp') {
      setGuestCount(prevState => {
        const newState = [...prevState];
        newState[0] += 1;
        return newState;
      });
    }
    if (label === 'adultDown' && guestCount[0] > 0) {
      setGuestCount(prevState => {
        const newState = [...prevState];
        newState[0] -= 1;
        return newState;
      });
    }
    if (label === 'kidUp') {
      setGuestCount(prevState => {
        const newState = [...prevState];
        newState[1] += 1;
        return newState;
      });
    }
    if (label === 'kidDown' && guestCount[1] > 0) {
      setGuestCount(prevState => {
        const newState = [...prevState];
        newState[1] -= 1;
        return newState;
      });
    }
    if (label === 'babyUp') {
      setGuestCount(prevState => {
        const newState = [...prevState];
        newState[2] += 1;
        return newState;
      });
    }
    if (label === 'babyDown' && guestCount[2] > 0) {
      setGuestCount(prevState => {
        const newState = [...prevState];
        newState[2] -= 1;
        return newState;
      });
    }
  };

  const toggleGuest = () => {
    setGuest(prev => !prev);
  };

  const toggleBooking = () => {
    setBooking(prev => !prev);
  };

  const startDateChange = (date: string) => {
    setStartDate(date);
  };
  const endDateChange = (date: string) => {
    setEndDate(date);
  };
  const toggleCalendar = () => {
    setCalendar(prev => !prev);
  };

  const checkCalendarBox = document.getElementById('CheckCalendarBox');
  const [checkInOutAnchorEl, setCheckInOutAnchorEl] = useState<null | HTMLElement>(null);
  const checkInOutOpen = Boolean(checkInOutAnchorEl);
  const handleCheckInOutClick = () => {
    setCheckInOutAnchorEl(checkCalendarBox);
  };
  const checkInOutClose = () => {
    setCheckInOutAnchorEl(null);
  };

  const people = document.getElementById('People');
  const [guestCountAnchorEl, setGuestCountAnchorEl] = useState<null | HTMLElement>(null);
  const guestCountOpen = Boolean(guestCountAnchorEl);
  const handleGuestCountClick = () => {
    setGuestCountAnchorEl(people);
  };
  const guestCountClose = () => {
    setGuestCountAnchorEl(null);
  };

  const [AdultGuestNumber, setAdultGuestNumber] = useRecoilState(AdultGuest);
  const [ChildGuestNumber, setChildGuestNumber] = useRecoilState(ChildGuest);
  const [InfantGuestNumber, setInfantGuestNumber] = useRecoilState(InfantGuest);

  const TotalGuestNumber = AdultGuestNumber + ChildGuestNumber;
  if (InfantGuestNumber > 0 && AdultGuestNumber === 0) {
    setAdultGuestNumber(prevValue => prevValue + 1);
  }
  const TotalGuestNumberCount =
    InfantGuestNumber === 0
      ? `게스트 ${TotalGuestNumber}명`
      : `게스트 ${TotalGuestNumber} 명, 유아 ${InfantGuestNumber}명 `;

  return (
    <Main booking={booking}>
      <div style={{ paddingBottom: "15px" }}>
        {price && Name ?
          <RoomInfo>
            <Typography fontFamily='Noto Sans KR'>{Name}</Typography>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Typography fontFamily='Noto Sans KR' fontWeight="500">₩ {price.toLocaleString()}</Typography>
              <Typography fontFamily='Noto Sans KR' fontWeight="300" fontSize="12px">/박</Typography>
            </div>
          </RoomInfo>
          :
          <Typography fontFamily='Noto Sans KR'>객실을 선택해주세요</Typography>}
      </div>
      <CheckContainer>
        <CheckCalendarBox onClick={handleCheckInOutClick} id='CheckCalendarBox'>
          <CheckInOutBox borderRight="1px solid black">
            <CheckTitle>체크인</CheckTitle>
            <CheckDate>{moment(firstPickedDate).format('M월 D일')}</CheckDate>
          </CheckInOutBox>
          <CheckInOutBox>
            <CheckTitle>체크아웃</CheckTitle>
            <CheckDate>{moment(secondPickedDate).format('M월 D일')}</CheckDate>
          </CheckInOutBox>
        </CheckCalendarBox>
        <CustomizedMenu
          id="basic-menu"
          anchorEl={checkInOutAnchorEl}
          open={checkInOutOpen}
          onClose={checkInOutClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          elevation={1}
        >
          <Calendar />
        </CustomizedMenu>
        <People onClick={handleGuestCountClick} id='People'>
          <PeopleTitle>인원</PeopleTitle>
          <PeopleDetail>
            {TotalGuestNumber > 0 ? TotalGuestNumberCount : '게스트 추가'}
          </PeopleDetail>
        </People>
        <CustomizedMenu
          id="basic-menu2"
          anchorEl={guestCountAnchorEl}
          open={guestCountOpen}
          onClose={guestCountClose}
          elevation={1}
        >
          <GuestCountAdult />
          <Divider variant="middle" />
          <GuestCountChild />
          <Divider variant="middle" />
          <GuestCountInfant />
        </CustomizedMenu>
      </CheckContainer>
      <BookingBtn onClick={toggleBooking}>예약</BookingBtn>

      {price && <BookingInfo>
        <BookingNotice>예약 확정 전에는 요금이 청구되지 않습니다.</BookingNotice>
        <BookingLine>
          <BookingDetail>₩ {price.toLocaleString()} x {moment(secondPickedDate).diff(moment(firstPickedDate), "days")}</BookingDetail>
          <BookingAmount>₩ {price * moment(secondPickedDate).diff(moment(firstPickedDate), "days")} </BookingAmount>
        </BookingLine>
        <BookingTotal>
          <TotalDetail>총 합계</TotalDetail>
          <TotalAmount>₩ {price * moment(secondPickedDate).diff(moment(firstPickedDate), "days")}</TotalAmount>
        </BookingTotal>
      </BookingInfo>}


    </Main >
  );
}
interface IMain {
  booking: boolean;
}

const Main = styled.div<IMain>`
  position: sticky;
  width: calc(30%);
  height: ${p => (p.booking ? '450px' : '250px')};
  top: 48px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 42px;
  @media screen and (max-width: 900px) {
    position: relative;
    margin: 0 auto;
    top: 0;
    width: 90%;
    box-shadow: none;
  }
`;
const RoomInfo = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
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
  border: 1px solid #c5c5c5;
  border-radius: 12px;
  cursor: pointer;
`;

interface ICheckInOutBox {
  borderRight?: string;
}

const CheckInOutBox = styled.div<ICheckInOutBox>`
  width: 50%;
  border-right: ${p => p.borderRight ?? ''};
  position: relative;
`;
const CheckCalendarBox = styled.div`
  display: flex;
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
const BookingInfo = styled.div``;

const BookingNotice = styled.div`
  font-size: 14px;
  margin: 10px auto;
  text-align: center;
`;
const BookingLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 16px;
  color: rgb(34, 34, 34);
`;
const BookingDetail = styled.div`
  text-decoration: underline;
`;

const BookingAmount = styled.div``;

const BookingTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-top: 1px solid rgb(221, 221, 221);
  font-size: 16px;
  color: rgb(113, 113, 113);
  font-weight: 700;
`;

const TotalDetail = styled.div``;
const TotalAmount = styled.div``;
