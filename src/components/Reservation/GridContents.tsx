import React, { useState } from 'react';
import styled from 'styled-components';

type Item = {
  title: string;
  checkIn: string;
  checkOut: string;
  id: number;
};

interface GridContentsProps {
  subElement?: React.ReactElement;
}

export default function GridContents({ subElement }: GridContentsProps) {
  const [contentsArray, setContentsArray] = useState<Item[]>([
    { id: Math.random(), title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
    { id: Math.random(), title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
    { id: Math.random(), title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
  ]);
  return (
    <>
      {contentsArray.map(item => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleGridItem key={item.id}>
            <StyleAccommodation loading="lazy" src="/images/image.png" alt="토끼" />
            <StyleContent>
              <h3>{item.title}</h3>
              <div>
                <span>{`체크인 : ${item.checkIn}`}</span>
                <span>{`체크아웃 : ${item.checkOut}`}</span>
              </div>
            </StyleContent>
          </StyleGridItem>
          {subElement}
        </div>
      ))}
    </>
  );
}

const StyleGridItem = styled.div`
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgb(220, 220, 220);
  overflow: hidden;
  background-color: white;
  height: 280px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 6px 4px -1px rgb(0 0 0 / 0.1), 4px 6px 4px -2px rgb(0 0 0 / 0.1);
`;

const StyleAccommodation = styled.img`
  height: 60%;
  object-fit: cover;
  object-position: center;
`;

const StyleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  height: 100%;
  font-family: Noto Sans KR;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }
  h3 {
    font-weight: bold;
    font-size: 23px;
  }
`;
