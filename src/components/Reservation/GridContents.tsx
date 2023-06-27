import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Item = {
  title: string;
  checkIn: string;
  checkOut: string;
  id: number;
};

interface GridContentsProps {
  subElement?: React.ReactElement;
  contentsArray?: Item[];
}

export default function GridContents({ subElement, contentsArray }: GridContentsProps) {
  return (
    <>
      {contentsArray?.map(item => (
        <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to={'detail'}>
            <StyleGridItem>
              <StyleAccommodation loading="lazy" src="/images/image.png" alt="토끼" />
              <StyleContent>
                <h3>{item.title}</h3>
                <div>
                  <span>{`체크인 : ${item.checkIn}`}</span>
                  <span>{`체크아웃 : ${item.checkOut}`}</span>
                </div>
              </StyleContent>
            </StyleGridItem>
          </Link>
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
