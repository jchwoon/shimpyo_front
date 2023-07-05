import ContentsTitle from '../reuse/ContentsTitle';
import ContentsSubText from '../reuse/ContentsSubText';
import { AmenityType } from '../../../../constants/amenityType';

import AccommodationAmenityInfoItem from './AccommodationAmenityInfoItem';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { disabledState } from '../../../../recoil/accommodationAtoms';
import { useEffect } from 'react';

export default function AccommodationAmenityInfoContents() {
  const [disabled, setDisabled] = useRecoilState(disabledState);

  const amenityList: (keyof AmenityType)[] = ['wifi', 'parking', 'bbq', 'pc'];

  useEffect(() => {
    setDisabled(false);
  }, []);

  return (
    <StyledContainer>
      <ContentsTitle>숙소 편의시설 정보를 추가하세요.</ContentsTitle>
      <ContentsSubText>
        여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을 추가할 수 있습니다.
      </ContentsSubText>
      <StyledItemContainer>
        {amenityList.map(amenity => {
          return <AccommodationAmenityInfoItem key={amenity} amenity={amenity} />;
        })}
      </StyledItemContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 10px;
`;

const StyledItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 780px) {
    width: 700px;
    justify-content: normal;
  }
`;
