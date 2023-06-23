import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Typography, Button } from '@mui/material';
import styled from '@emotion/styled';

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

import { CustomizedMenu } from '../Navbar/Navbar.styled'
import { Calendar } from '../../Main/MobileCalendar/Calendar';

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from '../Navbar/GuestCount';
import { Divider } from '@mui/material';

export default function SideBox() {
  const [guest, setGuest] = useState(false);
  const [guestCount, setGuestCount] = useState([0, 0, 0]);
  const [startDate, setStartDate] = useState('날짜 추가');
  const [endDate, setEndDate] = useState('날짜 추가');
  const [calendar, setCalendar] = useState(false);

  const price = useRecoilValue(activeRoomPrice)
  const Name = useRecoilValue(activeRoomName)
  const firstPickedDate = useRecoilValue(FirstPickedDate)
  const secondPickedDate = useRecoilValue(SecondPickedDate)

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

  const DaysDifference = moment(secondPickedDate).diff(moment(firstPickedDate), "days")
  const TotalPrice = price ? price * DaysDifference : null

  return (
    <Main >
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
            <CheckDate>{firstPickedDate ? moment(firstPickedDate).format('M월 D일') : "날짜 추가"}</CheckDate>
          </CheckInOutBox>
          <CheckInOutBox>
            <CheckTitle>체크아웃</CheckTitle>
            <CheckDate>{secondPickedDate ? moment(secondPickedDate).format('M월 D일') : "날짜 추가"}</CheckDate>
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
      <BookingBtn>
        <Typography fontFamily='Noto Sans KR' fontSize="17px">예약</Typography>
      </BookingBtn>

      {price ? DaysDifference ?
        <BookingInfo>
          <BookingNotice>예약 확정 전에는 요금이 청구되지 않습니다.</BookingNotice>
          <BookingLine>
            <BookingDetail>₩ {price.toLocaleString()} x {DaysDifference}박</BookingDetail>
          </BookingLine>
          <Divider />
          <BookingTotal>
            <TotalDetail>총 합계</TotalDetail>
            <TotalAmount>₩ {TotalPrice ? TotalPrice.toLocaleString() : null}</TotalAmount>
          </BookingTotal>
        </BookingInfo>
        :
        null
        :
        null}
    </Main >
  );
}


const Main = styled.div`
  position: sticky;
  width: calc(30%);
  height: 100%;
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
const CheckTitle = styled(Typography)`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  font-family: 'Noto Sans KR';
  color: #a2a2a2;
`;

const CheckDate = styled(Typography)`
  padding: 26px 12px 10px 12px;
  font-family: 'Noto Sans KR';
`;

const People = styled.div`
  position: relative;
  width: 100%;
`;
const PeopleTitle = styled(Typography)`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  font-family: 'Noto Sans KR';
  color: #a2a2a2;
`;

const PeopleDetail = styled(Typography)`
  display: flex;
  padding: 26px 12px 10px 12px;
  border-top: 1px solid black;
  justify-content: space-between;
  font-family: 'Noto Sans KR'
`;

const BookingBtn = styled(Button)`
background-color:#00adb5;
color: #ffffff;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  margin: 20px auto;
  cursor: pointer;
  :hover {
    background-color: #00c5cf;
  }
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
  padding: 10px 10px 20px 10px;
  font-size: 16px;
  color: rgb(34, 34, 34);
`;
const BookingDetail = styled(Typography)`
  text-decoration: underline;
  font-family: 'Noto Sans KR';
`;


const BookingTotal = styled(Typography)`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 0px 10px;
  font-size: 16px;
  color: #00adb5;
  font-family: 'Noto Sans KR';
  font-weight: 600;
`;

const TotalDetail = styled.div``;
const TotalAmount = styled.div``;
