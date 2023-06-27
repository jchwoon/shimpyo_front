import { useState } from 'react';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import ReservationCategory from '../ReservationCategory';
import styled from 'styled-components';
import Button from '../../shared/UI/Button';
import { useSearchParams } from 'react-router-dom';

export default function ReservationCancel() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleShowButton = () => {
    setIsOpen(prev => !prev);

    if (searchParams.get('reservationCancel') === 'true') {
      setSearchParams(searchParams => {
        searchParams.set('reservationCancel', 'false');
        return searchParams;
      });
    } else if (searchParams.get('reservationCancel') === 'false' || !searchParams.get('reservationCancel')) {
      setSearchParams(searchParams => {
        searchParams.set('reservationCancel', 'true');
        searchParams.set('reservationCancelPage', '1');
        return searchParams;
      });
    }
  };

  const subElement = (
    <StyleButtonBox>
      <Button label="삭제하기" />
    </StyleButtonBox>
  );

  const header = (
    <>
      <HeaderContents isOpen={isOpen} onClick={toggleShowButton} title="취소 내역" />
    </>
  );

  const main = (
    <>
      {isOpen && (
        <StyleGridBox>
          <GridContents subElement={subElement} />
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
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  justify-content: space-evenly;
`;

const StyleButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 0.3;
`;

const StyleFlexFooterBox = styled.div`
  text-align: center;
`;
