import styled from 'styled-components';
import { AccommodationIconMap, AccommodationNameMap, AccommodationType } from '../../../../constants/accommodationType';

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
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  @media (min-width: 780px) {
    padding: 20px;
    width: 50%;
  }
`;

const StyledItemButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 15px;

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
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 200px;
    height: 110px;
    padding-left: 10px;
  }
`;

const StyledItemName = styled.span`
  font-size: 17px;
  margin-left: 1rem;

  @media (min-width: 780px) {
    font-size: 15px;
    margin: 10px 0 0 10px;
  }
`;
