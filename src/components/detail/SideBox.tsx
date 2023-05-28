import axios, { Axios } from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';

export default function SideBox() {
  useEffect(() => {
    const result = async () => {
      const aa = axios.get('13.125.50.85:8081/test');
      console.log(aa);
    };
    result();
  }, []);

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
        <People>
          <PeopleTitle>인원</PeopleTitle>
          <PeopleDetail>게스트 1명</PeopleDetail>
        </People>
      </CheckContainer>
    </Main>
  );
}

const Main = styled.div`
  position: sticky;
  width: calc(40%);
  top: 48px;
  border: 1px solid black;
  border-radius: 12px;
  padding: 24px;
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

const CheckInOutBox =
  styled.div <
  ICheckInOutBox >
  `
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
  height: 100px;
`;
const PeopleTitle = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
`;

const PeopleDetail = styled.div`
  display: flex;
`;
