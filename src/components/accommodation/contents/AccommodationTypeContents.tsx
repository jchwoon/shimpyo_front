import { useState } from 'react';
import styled from 'styled-components';
import { AccommodationType } from '../../../constants/accommodationType';
import AccommodationTypeItem from './AccommodationTypeItem';
import ContentsTitle from './ContentsTitle';
import { useRecoilState } from 'recoil';
import { accommodationState } from '../../../recoil/atoms';

export default function AccommodationTypeContents() {
  const typeList: (keyof AccommodationType)[] = ['MOTEL', 'HOTEL', 'PENSION', 'GUEST'];
  const [selectedType, setSelectedType] = useState<keyof AccommodationType>('MOTEL');
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);

  const handleClick = (type: keyof AccommodationType) => {
    setSelectedType(type);

    const newAccommodation = { ...accommodation, type: type };
    setAccommodation(newAccommodation);
  };

  return (
    <div>
      <ContentsTitle>다음 중 숙소를 가장 잘 설명하는 것은 무엇인가요?</ContentsTitle>
      <StyledFlexDiv>
        {typeList.map(type => (
          <AccommodationTypeItem type={type} key={type} isSelected={selectedType === type} onClick={handleClick} />
        ))}
      </StyledFlexDiv>
    </div>
  );
}

const StyledFlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  justify-content: space-between;
  margin: 0 auto;
`;
