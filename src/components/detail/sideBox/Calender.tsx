import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect } from "react";
import moment from "moment";
import 'moment/locale/ko';
import {
  DatePicker,
  useDatePickGetter,
  useDatePickReset,
} from '@bcad1591/react-date-picker';

export default function SideCalendar(props:any){
  const { toggleCalendar, startDateChange, endDateChange, getDateGap } = props;
  const { pickedDates } = useDatePickGetter()

  const resetFunc = useDatePickReset();
  const startDate = moment(pickedDates.firstPickedDate)
  const endDate = moment(pickedDates.secondPickedDate)

  useEffect(()=>{
    startDateChange(pickedDates.firstPickedDate ===null ? '날짜 추가' : startDate.format('ll') )
    endDateChange(pickedDates.secondPickedDate ===null ? '날짜 추가' :endDate.format('ll'))
    getDateGap(endDate.diff(startDate,'days'))
  },[startDate.format('ll'), endDate.format('ll')])


  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CalendarContainer>
        <CalendarTop>
          <CalendarLeft>
            <StayDate>{isNaN(endDate.diff(startDate,'days')) ? '-' : endDate.diff(startDate,'days') } 박</StayDate>
            <StayPeriod>{ pickedDates.firstPickedDate ===null ? '날짜 추가' : startDate.format('ll')  } ~ {pickedDates.secondPickedDate ===null ? '날짜 추가' :endDate.format('ll')}</StayPeriod>
          </CalendarLeft>
          <CalendarRight>
            <CloseCalendar onClick={toggleCalendar}>닫기</CloseCalendar>
          </CalendarRight>
        </CalendarTop>
        <CalendarBottom>
          <DatePicker disablePreviousDays />
        <ResetBtn onClick={resetFunc}>날짜 지우기</ResetBtn>
        </CalendarBottom>
      </CalendarContainer>
    </LocalizationProvider>
  )
}

const CalendarContainer = styled.div`
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  background-color: #fff;
  padding: 24px 32px 16px;
  position: absolute;
  top:-24px;
  right: -32px;
  z-index: 1;
  @media screen and (max-width: 900px){
    left:-10px;
  };
`

const CalendarTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`

const CalendarLeft = styled.div`
  
`

const StayDate = styled.div`
  font-size: 22px;
  font-weight: 700;
`
const StayPeriod = styled.div`
  font-size: 14px;
  color: #717171;
`

const CalendarRight = styled.div`
  position:relative;

`
const CloseCalendar = styled.div`
  background-color: #222222;
  padding: 8px 16px;
  color:white;
  border-radius: 8px;
  cursor: pointer;
`
const CalendarBottom = styled.div`
  display: flex;
  justify-content: space-between;
`

const ResetBtn = styled.div`
  position:absolute;
  top:24px;
  right:100px;
  padding: 8px 16px;
  text-decoration: underline;
  font-weight: 700;
  cursor: pointer;
`