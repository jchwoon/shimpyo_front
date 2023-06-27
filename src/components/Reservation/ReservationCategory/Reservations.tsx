import ReservationCategory from '../ReservationCategory';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

type Item = {
  title: string;
  checkIn: string;
  checkOut: string;
  id: number;
};

export default function Reservations() {
  const [contentsArray, setContentsArray] = useState<Item[]>([
    { id: 1, title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
    { id: 2, title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
    { id: 3, title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleShowButton = () => {
    setIsOpen(prev => !prev);

    if (searchParams.get('reservation') === 'true') {
      setSearchParams(searchParams => {
        searchParams.set('reservation', 'false');
        return searchParams;
      });
    } else if (searchParams.get('reservation') === 'false' || !searchParams.get('reservation')) {
      setSearchParams(searchParams => {
        searchParams.set('reservation', 'true');
        searchParams.set('reservationPage', '1');
        return searchParams;
      });
    }
  };

  const header = (
    <>
      <HeaderContents isOpen={isOpen} onClick={toggleShowButton} title="예약 내역" />
    </>
  );

  const main = (
    <>
      {isOpen && (
        <StyleGridBox>
          <GridContents contentsArray={contentsArray} />
        </StyleGridBox>
      )}
    </>
  );

  const footer = (
    <>
      {isOpen && (
        <StyleFlexFooterBox>
          <div>
            <span>&lt;&lt;</span>&nbsp;&nbsp;<span>&lt;</span> <span>&gt;</span>&nbsp;&nbsp;<span>&gt;&gt;</span>
          </div>
        </StyleFlexFooterBox>
      )}
    </>
  );

  return <ReservationCategory header={header} main={main} footer={footer} />;
}

const StyleGridBox = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(330px, 360px));
  justify-content: space-evenly;
`;

const StyleFlexFooterBox = styled.div`
  text-align: center;
`;
