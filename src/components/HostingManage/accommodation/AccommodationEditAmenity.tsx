import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { accommodationDataState, patchHouseReqState } from '../../../recoil/hostingManageAtoms';
import { AmenityIconMap, AmenityNameMap, AmenityType } from '../../../constants/amenityType';

export default function AccommodationEditAmenity() {
  const [accommodationData, setAccommodationData] = useRecoilState(accommodationDataState);
  const [patchHouseReq, setPatchHouseReq] = useRecoilState(patchHouseReqState);

  const amenityList: (keyof AmenityType)[] = ['pc', 'wifi', 'parking', 'bbq'];

  const changeAmenity = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLInputElement).value as keyof AmenityType;

    const newAccommodationData = { ...accommodationData };
    newAccommodationData.options = [...newAccommodationData.options];

    if (newAccommodationData.options.includes(value)) {
      const index = newAccommodationData.options.indexOf(value);
      newAccommodationData.options.splice(index, 1);
    } else {
      newAccommodationData.options.push(value);
    }

    const newPatchHouseReq = { ...patchHouseReq };
    newPatchHouseReq.option = { ...newPatchHouseReq.option };
    newPatchHouseReq.option[value] = !newPatchHouseReq.option[value];

    setAccommodationData(newAccommodationData);
    setPatchHouseReq(newPatchHouseReq);
  };

  return (
    <StyledAmenityContainer>
      {amenityList.map((amenity, idx) => {
        return (
          <StyledAmenityDiv key={idx}>
            <StyledItemButton
              value={amenity}
              type="button"
              role="checkbox"
              aria-checked={accommodationData.options.includes(amenity)}
              onClick={changeAmenity}
            >
              {AmenityIconMap[amenity]}
              <StyledTextContainer>
                <StyledItemName>{AmenityNameMap[amenity]}</StyledItemName>
              </StyledTextContainer>
            </StyledItemButton>
          </StyledAmenityDiv>
        );
      })}
    </StyledAmenityContainer>
  );
}

const StyledAmenityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledAmenityDiv = styled.div`
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
    transition: transform 0.1s ease;
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
