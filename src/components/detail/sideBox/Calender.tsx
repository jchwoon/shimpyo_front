import styled from "styled-components";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useState } from "react";
import moment from "moment";
import 'moment/locale/ko';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function SideCalendar(){
  const [startDate,setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment().add(1,'days'))
  const handleStart = (newValue:moment.Moment) => {
    if(startDate<endDate) setStartDate(newValue)
    // else alert('체크인 기간은 체크아웃 기간보다 앞에 위치해야 합니다.')
  }
  const handleEnd = (newValue:moment.Moment) => {
    if(startDate<endDate) setEndDate(newValue)
    // else alert('체크아웃 기간은 체크인 기간보다 뒤에 위치해야 합니다.')
  }


  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CalendarContainer>
        <CalendarTop>
          <CalendarLeft>
            <StayDate>{endDate.diff(startDate,'days')} 박</StayDate>
            <StayPeriod>{startDate.format('ll')} ~ {endDate.format('ll')}</StayPeriod>
          </CalendarLeft>
          <CalendarRight>
            <CloseCalendar>닫기</CloseCalendar>
          </CalendarRight>
        </CalendarTop>
        <CalendarBottom>
        <DateCalendar value={startDate} onChange={(newValue)=>handleStart(newValue ?? moment())}/>
        <DateCalendar value={endDate} onChange={(newValue1) => handleEnd(newValue1 ?? moment())}/>
        {/* <Calendar /> */}
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
  width: 900px;
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