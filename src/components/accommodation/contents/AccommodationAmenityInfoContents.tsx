import { useState } from 'react';
import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import { AmenityType } from '../../../constants/amenityType';

import AccommodationAmenityInfoItem from './AccommodationAmenityInfoItem';
import styled from 'styled-components';

export default function AccommodationAmenityInfoContents() {
  const amenityList: (keyof AmenityType)[] = ['wifi', 'parking', 'bbq', 'pc', 'tv'];
  const [option, setOption] = useState<AmenityType>({ wifi: false, parking: false, bbq: false, pc: false, tv: false });

  const handleOnClick = (value: keyof AmenityType) => {
    const newOption = { ...option };
    newOption[value] = !newOption[value];
    setOption(newOption);
  };

  return (
    <div>
      <ContentsTitle>숙소 편의시설 정보를 추가하세요.</ContentsTitle>
      <ContentsSubText>
        여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을 추가할 수 있습니다.
      </ContentsSubText>
      <StyledFlexContainer>
        {amenityList.map(amenity => {
          return (
            <AccommodationAmenityInfoItem
              key={amenity}
              amenity={amenity}
              isSelected={option[amenity]}
              onClick={handleOnClick}
            />
          );
        })}
      </StyledFlexContainer>
    </div>
  );
}

const StyledFlexContainer = styled.div`
  display: flex;
  width: 630px;
  flex-wrap: wrap;
`;
