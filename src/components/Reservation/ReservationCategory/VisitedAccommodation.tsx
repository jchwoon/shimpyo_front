import { useState } from 'react';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import ReservationCategory from '../ReservationCategory';
import styled from 'styled-components';
import ColorButton from '../../shared/UI/ColorButton';
import Button from '../../shared/UI/Button';
import { useSearchParams } from 'react-router-dom';

type Item = {
  title: string;
  checkIn: string;
  checkOut: string;
  id: number;
};

export default function VisitedAccommodation() {
  const [contentsArray, setContentsArray] = useState<Item[]>([
    { id: 1, title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
    { id: 2, title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
    { id: 3, title: '르네상스 서울', checkIn: '06.13 목 14:00', checkOut: '06.14 금 11:00' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleShowButton = () => {
    setIsOpen(prev => !prev);
    if (searchParams.get('visited') === 'true') {
      setSearchParams(searchParams => {
        searchParams.set('visited', 'false');
        return searchParams;
      });
    } else if (searchParams.get('visited') === 'false' || !searchParams.get('visited')) {
      setSearchParams(searchParams => {
        searchParams.set('visited', 'true');
        searchParams.set('visitedPage', '1');
        return searchParams;
      });
    }
  };

  const subElement = (
    <StyleButtonBox>
      <Button label="삭제하기" />
      <ColorButton label="후기 작성하기" onClick={() => console.log('hi')} />
    </StyleButtonBox>
  );
  const header = (
    <>
      <HeaderContents isOpen={isOpen} onClick={toggleShowButton} title="이용 내역" />
    </>
  );

  const main = (
    <>
      {isOpen && (
        <StyleGridBox>
          <GridContents contentsArray={contentsArray} subElement={subElement} />
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

const StyleButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 0.3;
`;

const StyleFlexFooterBox = styled.div`
  text-align: center;
`;
