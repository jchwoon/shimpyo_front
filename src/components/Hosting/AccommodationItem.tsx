import styled from 'styled-components';

import { AccommodationDataType } from './HostingMain';
import AccommodationOption from './AccommodationOption';

interface AccommodationItemProps {
  onClick: () => void;
  data: AccommodationDataType;
  isSelected: boolean;
}

export default function AccommodationItem({ onClick, data, isSelected }: AccommodationItemProps) {
  return (
    <StyledItemContainer onClick={onClick} aria-checked={isSelected}>
      {isSelected && <Dimmed />}
      {isSelected && <AccommodationOption houseId={data.id} />}
      <StyledItemTypeName>{data.houseType}</StyledItemTypeName>
      <StyledImg src={data.imageUrl} />
      <StyledItemName>{data.name}</StyledItemName>
    </StyledItemContainer>
  );
}

const StyledItemContainer = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  gap: 10px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #359da450;
  box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.5);
  z-index: 1;
  &:hover {
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.5);
  }

  ${({ 'aria-checked': ariaChecked }) => {
    if (ariaChecked === true) {
      return `
      pointer-events: none;
      `;
    }
  }}
`;

const Dimmed = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;

const StyledImg = styled.img`
  width: 100%;
  object-fit: contain;
`;

const StyledItemTypeName = styled.span`
  color: white;
  background-color: #009ca6;
  text-align: center;
  padding: 8px;
  border-radius: 20px 20px 0 0;
  box-shadow: inset 0 0 5px 0.5px rgba(0, 0, 0, 0.2);
`;

const StyledItemName = styled.span`
  padding: 8px;
  text-align: center;
  background-color: #ecf7f8da;
  border-radius: 0 0 20px 20px;
`;
