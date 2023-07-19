import { useRecoilValue } from 'recoil';
import { accommodationDataState } from '../../../recoil/hostingManageAtoms';
import { AmenityIconMap, AmenityNameMap } from '../../../constants/amenityType';
import styled from 'styled-components';

export default function AccommodationAmenity() {
  const accommodationData = useRecoilValue(accommodationDataState);

  return (
    <StyledAmenityContainer>
      {accommodationData.options.map((amenity, idx) => {
        return (
          <StyledAmenityDiv key={idx}>
            <StyledItem value={amenity}>
              {AmenityIconMap[amenity]}
              <StyledTextContainer>
                <StyledItemName>{AmenityNameMap[amenity]}</StyledItemName>
              </StyledTextContainer>
            </StyledItem>
          </StyledAmenityDiv>
        );
      })}
    </StyledAmenityContainer>
  );
}

const StyledAmenityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 1075px) {
    flex-wrap: nowrap;
  }
`;

const StyledAmenityDiv = styled.div`
  padding: 5px;
  width: 50%;
`;

const StyledItem = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 90px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0 20px;
  background-color: white;
`;

const StyledTextContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledItemName = styled.span`
  font-size: 15px;
  font-weight: 500;
  text-align: left;

  @media (max-width: 500px) {
    font-size: 10px;
    width: 50px;
    margin-left: 10px;
  }
`;
