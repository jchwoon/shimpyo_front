import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AccommodationType } from '../../../../constants/accommodationType';
import AccommodationTypeItem from './AccommodationTypeItem';
import ContentsTitle from '../reuse/ContentsTitle';
import { useRecoilState } from 'recoil';
import { accommodationState, disabledState } from '../../../../recoil/accommodationAtoms';

export default function AccommodationTypeContents() {
  const [disabled, setDisabled] = useRecoilState(disabledState);

  const typeList: (keyof AccommodationType)[] = ['MOTEL', 'HOTEL', 'PENSION', 'GUEST'];
  const [selectedType, setSelectedType] = useState<keyof AccommodationType>('MOTEL');
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);

  const handleClick = (type: keyof AccommodationType) => {
    setSelectedType(type);

    const newAccommodation = { ...accommodation, type: type };
    setAccommodation(newAccommodation);
  };

  useEffect(() => {
    setDisabled(false);
  }, []);

  return (
    <StyledContainer>
      <ContentsTitle>다음 중 숙소를 가장 잘 설명하는 것은 무엇인가요?</ContentsTitle>
      <StyledFlexDiv>
        {typeList.map(type => (
          <AccommodationTypeItem type={type} key={type} isSelected={selectedType === type} onClick={handleClick} />
        ))}
      </StyledFlexDiv>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 1.2rem;
`;

const StyledFlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 780px) {
    width: 500px;
    margin: 0 auto;
    justify-content: space-between;
  }
`;
