import styled from 'styled-components';
import { RoomIconMap, RoomNameMap, RoomContentMap, RoomType } from '../../../../constants/roomType';

interface RoomTypeItemProps {
  type: keyof RoomType;
  isSelected: boolean;
  onClick: (type: keyof RoomType) => void;
}

export default function RoomTypeItem({ type, isSelected, onClick }: RoomTypeItemProps) {
  const handleClick = () => {
    onClick(type);
  };
  return (
    <StyledButtonDiv>
      <StyledItemButton value={type} type="button" role="checkbox" aria-checked={isSelected} onClick={handleClick}>
        <StyledTextContainer>
          <StyledItemName>{RoomNameMap[type]}</StyledItemName>
          <StyledStepContent>{RoomContentMap[type]}</StyledStepContent>
        </StyledTextContainer>
        {RoomIconMap[type]}
      </StyledItemButton>
    </StyledButtonDiv>
  );
}

const StyledButtonDiv = styled.div`
  padding: 20px;
`;

const StyledItemButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 550px;
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
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const StyledItemName = styled.span`
  font-size: 15px;
  font-weight: 500;
  text-align: left;
`;

const StyledStepContent = styled.p`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
  text-align: left;
`;
