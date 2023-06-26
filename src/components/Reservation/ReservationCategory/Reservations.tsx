import ReservationCategory from '../ReservationCategory';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import { useState } from 'react';
import styled from 'styled-components';

export default function Reservations() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleShowButton = () => {
    setIsOpen(prev => !prev);
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
          <GridContents />
        </StyleGridBox>
      )}
    </>
  );

  return <ReservationCategory header={header} main={main} />;
}

const StyleGridBox = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(330px, 360px));
  justify-content: space-evenly;
`;
