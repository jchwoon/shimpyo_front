import styled from 'styled-components';
import { AmenityType, AmenityIconMap, AmenityNameMap } from '../../../../constants/amenityType';
import { useRecoilState } from 'recoil';
import { accommodationState } from '../../../../recoil/accommodationAtoms';

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
  width: 100%;
  @media (min-width: 780px) {
    width: 30%;
  }
`;

const StyledItemButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
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

  @media (min-width: 780px) {
    width: 200px;
    justify-content: space-between;
  }
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
