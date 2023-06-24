import styled from 'styled-components';
import { AccommodationIconMap, AccommodationNameMap, AccommodationType } from '../../../constants/accommodationType';

interface AccommodationTypeItemProps {
  type: keyof AccommodationType;
  isSelected: boolean;
  onClick: (type: keyof AccommodationType) => void;
}

export default function AccommodationTypeItem({ type, isSelected, onClick }: AccommodationTypeItemProps) {
  const handleClick = () => {
    onClick(type);
  };

  return (
    <StyledButtonDiv>
      <StyledItemButton value={type} type="button" role="checkbox" aria-checked={isSelected} onClick={handleClick}>
        {AccommodationIconMap[type]}
        <StyledItemName>{AccommodationNameMap[type]}</StyledItemName>
      </StyledItemButton>
    </StyledButtonDiv>
  );
}

const StyledButtonDiv = styled.div`
  padding: 20px;
`;

const StyledItemButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 110px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding-left: 10px;
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

const StyledItemName = styled.span`
  font-size: 15px;
  margin: 10px 0 0 10px;
`;
