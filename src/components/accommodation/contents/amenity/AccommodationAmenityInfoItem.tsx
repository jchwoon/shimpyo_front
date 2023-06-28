import styled from 'styled-components';
import { AmenityType, AmenityIconMap, AmenityNameMap } from '../../../../constants/amenityType';
import { useRecoilState } from 'recoil';
import { accommodationState } from '../../../../recoil/atoms';

interface AmenityItemProps {
  amenity: keyof AmenityType;
}

export default function AccommodationAmenityInfoItem({ amenity }: AmenityItemProps) {
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);

  const handleClick = () => {
    const newAccommodation = { ...accommodation };

    newAccommodation.option = { ...newAccommodation.option };
    newAccommodation.option[amenity] = !newAccommodation.option[amenity];

    setAccommodation(newAccommodation);
  };

  return (
    <StyledButtonDiv>
      <StyledItemButton
        value={amenity}
        type="button"
        role="checkbox"
        aria-checked={accommodation.option[amenity]}
        onClick={handleClick}
      >
        {AmenityIconMap[amenity]}
        <StyledTextContainer>
          <StyledItemName>{AmenityNameMap[amenity]}</StyledItemName>
        </StyledTextContainer>
      </StyledItemButton>
    </StyledButtonDiv>
  );
}

const StyledButtonDiv = styled.div`
  padding: 5px;
`;

const StyledItemButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 90px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0 20px;
  background-color: white;

  &:hover {
    border: 3px solid black;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.2s ease;
  }

  ${({ 'aria-checked': ariaChecked }) => {
    if (ariaChecked === true) {
      return `
    background-color: rgba(0, 0, 0, 0.05);
    border: 3px solid black;
  `;
    }
  }}
`;

const StyledTextContainer = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
`;

const StyledItemName = styled.span`
  font-size: 15px;
  font-weight: 500;
  text-align: left;
`;
