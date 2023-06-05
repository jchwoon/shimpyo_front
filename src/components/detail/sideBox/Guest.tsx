import styled from "styled-components";
import { useState } from 'react';

export default function Guest(props:any){
  const { guestCount, guestChange, toggleGuest } = props

  return (
<GuestCountContainer>
            <GuestEach>
              <GuestType>
                <GuestTitle>성인</GuestTitle>
                <GuestDetail>만 13세 이상</GuestDetail>
              </GuestType>
              <GuestCounting>
                <GuestSet disabled={guestCount[0]===0} onClick={()=>guestChange("adultDown")}> - </GuestSet>
                <GuestCount> {guestCount[0]} </GuestCount>
                <GuestSet disabled={false} onClick={()=>guestChange("adultUp")}> + </GuestSet>
              </GuestCounting>
            </GuestEach>
            <GuestEach>
              <GuestType>
                <GuestTitle>어린이</GuestTitle>
                <GuestDetail>만 2세 ~ 12세 </GuestDetail>
              </GuestType>
              <GuestCounting>
                <GuestSet disabled={guestCount[1]===0} onClick={()=>guestChange("kidDown")}> - </GuestSet>
                <GuestCount> {guestCount[1]} </GuestCount>
                <GuestSet disabled={false} onClick={()=>guestChange("kidUp")}> + </GuestSet>
              </GuestCounting>
            </GuestEach>
            <GuestEach>
              <GuestType>
                <GuestTitle>유아</GuestTitle>
                <GuestDetail>만 2세 미만 </GuestDetail>
              </GuestType>
              <GuestCounting>
                <GuestSet disabled={guestCount[2]===0} onClick={()=>guestChange("babyDown")}> - </GuestSet>
                <GuestCount> {guestCount[2]} </GuestCount>
                <GuestSet disabled={false} onClick={()=>guestChange("babyUp")}> + </GuestSet>
              </GuestCounting>
            </GuestEach>
            <GuestClose onClick={toggleGuest}>닫기</GuestClose>
          </GuestCountContainer>
  )
}

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
  margin-bottom: 24px;
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

interface IGuestSet {
  disabled? : boolean
}

const GuestSet = styled.div<IGuestSet>`
  border: 1px solid ${p=>p.disabled ? "#EBEBEB" : "#B0B0B0"};
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  font-size: large;
  font-weight: 700;
  cursor: pointer;
  color: ${p=>p.disabled ? "#EBEBEB" : "black"};
`;
const GuestCount = styled.div`
  margin: 0 12px;
`;

const GuestClose = styled.div`
  text-decoration: underline;
  font-size: 18px;
  text-align: end;
  font-weight: 700;
  cursor: pointer;
`;
