import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styled from 'styled-components';
import Guest from './Guest';
import 'moment/locale/ko';

export default function SideBox() {
  const [guest, setGuest] = useState(false);
  const [guestCount, setGuestCount] = useState([0, 0, 0]);
  const [startDate, setStartDate] = useState('날짜 추가');
  const [endDate, setEndDate] = useState('날짜 추가');
  const [calendar, setCalendar] = useState(false);
  const [booking, setBooking] = useState(true);

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

  return (
    <Main booking={booking}>
      <Text>
        <TotalPrice>₩23,000</TotalPrice>
        <Day>/박</Day>
      </Text>
      <CheckContainer>
        <CheckCalendarBox onClick={toggleCalendar}>
          <CheckInOutBox borderRight="1px solid black">
            <CheckTitle>체크인</CheckTitle>
            <CheckDate>{startDate}</CheckDate>
          </CheckInOutBox>
          <CheckInOutBox>
            <CheckTitle>체크아웃</CheckTitle>
            <CheckDate>{endDate}</CheckDate>
          </CheckInOutBox>
        </CheckCalendarBox>
        <People onClick={toggleGuest}>
          <PeopleTitle>인원</PeopleTitle>
          <PeopleDetail>
            <div>
              게스트 {guestCount[0]}명{guestCount[1] !== 0 && <span>, 어린이 {guestCount[1]}명</span>}
              {guestCount[2] !== 0 && <span>, 유아 {guestCount[2]}명</span>}
            </div>
            <div>
              {!guest && <AiOutlineDown />}
              {guest && <AiOutlineUp />}
            </div>
          </PeopleDetail>
        </People>
        {guest && <Guest guestCount={guestCount} guestChange={guestChange} toggleGuest={toggleGuest} />}
      </CheckContainer>
      <BookingBtn onClick={toggleBooking}>예약 가능 여부 보기</BookingBtn>
      {booking && (
        <BookingInfo>
          <BookingNotice>예약 확정 전에는 요금이 청구되지 않습니다.</BookingNotice>
          <BookingLine>
            <BookingDetail>₩230,000 x 1박</BookingDetail>
            <BookingAmount>₩230,000 </BookingAmount>
          </BookingLine>
          <BookingLine>
            <BookingDetail>에어비엔비 서비스 수수료</BookingDetail>
            <BookingAmount>₩35,718 </BookingAmount>
          </BookingLine>
          <BookingTotal>
            <TotalDetail>총 합계</TotalDetail>
            <TotalAmount>₩265,718</TotalAmount>
          </BookingTotal>
        </BookingInfo>
      )}
    </Main>
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
