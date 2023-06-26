import { useState } from 'react';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import ReservationCategory from '../ReservationCategory';
import styled from 'styled-components';
import ColorButton from '../../shared/UI/ColorButton';
import Button from '../../shared/UI/Button';

export default function VisitedAccommodation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleShowButton = () => {
    setIsOpen(prev => !prev);
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
          <GridContents subElement={subElement} />
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

const StyleButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 0.3;
`;
