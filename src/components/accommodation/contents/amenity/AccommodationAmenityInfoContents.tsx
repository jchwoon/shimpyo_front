import ContentsTitle from '../ContentsTitle';
import ContentsSubText from '../ContentsSubText';
import { AmenityType } from '../../../../constants/amenityType';

import AccommodationAmenityInfoItem from './AccommodationAmenityInfoItem';
import styled from 'styled-components';

export default function AccommodationAmenityInfoContents() {
  const amenityList: (keyof AmenityType)[] = ['wifi', 'parking', 'bbq', 'pc'];

  return (
    <StyledFlexContainer>
      <ContentsTitle>숙소 편의시설 정보를 추가하세요.</ContentsTitle>
      <ContentsSubText>
        여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을 추가할 수 있습니다.
      </ContentsSubText>
      <StyledItemContainer>
        {amenityList.map(amenity => {
          return <AccommodationAmenityInfoItem key={amenity} amenity={amenity} />;
        })}
      </StyledItemContainer>
    </StyledFlexContainer>
  );
}

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledItemContainer = styled.div`
  display: flex;
  width: 700px;
  flex-wrap: wrap;
`;
