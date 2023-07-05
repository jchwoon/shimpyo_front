import moment from 'moment';
import 'moment/locale/ko';
import { Typography, Button, IconButton } from '@mui/material';
import styled from '@emotion/styled';

import { useRecoilValue, useRecoilState } from 'recoil';
import {
  activeRoomPrice,
  activeRoomName,
  FirstPickedDate,
  SecondPickedDate,
  AdultGuest,
  ChildGuest,
  InfantGuest,
} from '../../../../../recoil/atoms';

import { Calendar } from '../../../../Main/MobileCalendar/Calendar';

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from '../../../../detail/Navbar/GuestCount';
import { Divider } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ClearIcon from '@mui/icons-material/Clear';

export default function NewSideBox() {
  const price = useRecoilValue(activeRoomPrice);
  const Name = useRecoilValue(activeRoomName);
  const [firstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate);
  const [secondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate);

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

  const DaysDifference = moment(secondPickedDate).diff(moment(firstPickedDate), 'days');
  const TotalPrice = price ? price * DaysDifference : null;

  const resetFunction = () => {
    setFirstPickedDate('');
    setSecondPickedDate('');
  };

  const guestCountReset = () => {
    setAdultGuestNumber(0);
    setChildGuestNumber(0);
    setInfantGuestNumber(0);
  };

  return (
    <Main>
      <MainTitle>예약</MainTitle>
      <div style={{ paddingBottom: '15px' }}>
        {price && Name ? (
          <RoomInfo>
            <Typography fontFamily="Noto Sans KR">{Name}</Typography>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography fontFamily="Noto Sans KR" fontWeight="500">
                ₩ {price.toLocaleString()}
              </Typography>
              <Typography fontFamily="Noto Sans KR" fontWeight="300" fontSize="12px">
                /박
              </Typography>
            </div>
          </RoomInfo>
        ) : (
          <Typography fontFamily="Noto Sans KR">객실을 선택해주세요</Typography>
        )}
      </div>

      <CustomizedCheckInOutAccordion elevation={0}>
        <CutomizedCheckInOutAccordionSummary
          sx={{ border: 'solid 1px #c5c5c5' }}
          aria-controls="panel1a-content"
          id="panel1a-header1"
        >
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div
              style={{
                width: '50%',
                height: '50px',
                borderBottom: 'solid 1px #c5c5c5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography fontFamily="Noto Sans KR" fontSize="12px" color="#a2a2a2">
                체크인
              </Typography>
              <Typography fontFamily="Noto Sans KR">
                {firstPickedDate ? moment(firstPickedDate).format('M월 D일') : '날짜 추가'}
              </Typography>
            </div>
            <div
              style={{
                width: '50%',
                height: '50px',
                border: 'solid 1px #c5c5c5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography fontFamily="Noto Sans KR" fontSize="12px" color="#a2a2a2">
                체크아웃
              </Typography>
              <Typography fontFamily="Noto Sans KR">
                {secondPickedDate ? moment(secondPickedDate).format('M월 D일') : '날짜 추가'}
              </Typography>
            </div>
          </div>
        </CutomizedCheckInOutAccordionSummary>
        <AccordionDetails>
          {firstPickedDate ? (
            <CustomizedDeleteIconButton onClick={resetFunction} top={55} left={5}>
              <CustomziedClearIcon />
            </CustomizedDeleteIconButton>
          ) : null}
          <Calendar />
        </AccordionDetails>
      </CustomizedCheckInOutAccordion>
      <CustomizedGuestAccordion elevation={0}>
        <CutomizedGuestAccordionSummary
          sx={{ border: 'solid 1px #c5c5c5' }}
          aria-controls="panel1a-content"
          id="panel1a-header2"
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '50px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography fontFamily="Noto Sans KR" fontSize="12px" color="#a2a2a2">
              여행자
            </Typography>
            <Typography fontFamily="Noto Sans KR">
              {TotalGuestNumber > 0 ? TotalGuestNumberCount : '게스트 추가'}
            </Typography>
          </div>
        </CutomizedGuestAccordionSummary>
        <CutomizedAccordionDetails sx={{ paddingTop: '25px' }}>
          {TotalGuestNumber > 0 ? (
            <CustomizedDeleteIconButton onClick={guestCountReset} top={55} left={5}>
              <CustomziedClearIcon />
            </CustomizedDeleteIconButton>
          ) : null}
          <GuestCountAdult />
          <Divider variant="middle" />
          <GuestCountChild />
          <Divider variant="middle" />
          <GuestCountInfant />
        </CutomizedAccordionDetails>
      </CustomizedGuestAccordion>

      <BookingBtn disabled={!Name || !firstPickedDate || !secondPickedDate || TotalGuestNumber <= 0}>
        <Typography fontFamily="Noto Sans KR" fontSize="17px">
          예약
        </Typography>
      </BookingBtn>

      {price ? (
        DaysDifference ? (
          <BookingInfo>
            <BookingNotice>예약 확정 전에는 요금이 청구되지 않습니다.</BookingNotice>
            <BookingLine>
              <BookingDetail>
                ₩ {price.toLocaleString()} x {DaysDifference}박
              </BookingDetail>
            </BookingLine>
            <Divider />
            <BookingTotal>
              <TotalDetail>총 합계</TotalDetail>
              <TotalAmount>₩ {TotalPrice ? TotalPrice.toLocaleString() : null}</TotalAmount>
            </BookingTotal>
          </BookingInfo>
        ) : null
      ) : null}
    </Main>
  );
}

const MainTitle = styled(Typography)`
  padding: 30px 0 24px 0;
  font-size: 22px;
  font-weight: 600;
  font-family: Noto Sans KR;
  @media screen and (min-width: 750px) {
    display: none;
  }
`;

const CustomizedDeleteIconButton = styled(IconButton)<{ top: number; left: number }>`
  background-color: #00adb5;
  width: 30px;
  height: 30px;
  :hover {
    background-color: #00c5cf;
  }
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  position: absolute;
`;

const CustomziedClearIcon = styled(ClearIcon)`
  width: 15px;
  height: 15px;
  color: white;
`;

const CustomizedCheckInOutAccordion = styled(Accordion)`
  :before {
    background-color: white;
  }
`;

const CutomizedCheckInOutAccordionSummary = styled(AccordionSummary)`
  height: 50px;
  &.Mui-expanded {
    min-height: 50px;
  }
  overflow: hidden;
  border-radius: 15px 15px 0px 0px;
  padding: 0px;
`;
const CustomizedGuestAccordion = styled(Accordion)`
  :before {
    background-color: white;
  }
`;
const CutomizedGuestAccordionSummary = styled(AccordionSummary)`
  height: 50px;
  &.Mui-expanded {
    min-height: 50px;
  }
  overflow: hidden;
  border-radius: 0px 0px 15px 15px;
  padding: 0px;
`;

const CutomizedAccordionDetails = styled(AccordionDetails)`
  padding-left: 0px;
  padding-right: 0px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  position: sticky;
  width: 330px;
  top: 100px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  border-radius: 12px;
  padding: 24px;

  margin: 0px 30px 40px 30px;
  @media screen and (max-width: 750px) {
    position: relative;
    margin: 20px auto;
    top: 0;
    width: 100%;
    box-shadow: none;
  }
`;
const RoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BookingBtn = styled(Button)`
  background-color: #00adb5;
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
  &:disabled {
    background-color: #00959c;
    color: #d9d9d9;
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
