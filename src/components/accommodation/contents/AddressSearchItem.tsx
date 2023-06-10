import styled from 'styled-components';
import { BsFillBuildingFill } from 'react-icons/bs';

import { Prediction } from './AddressSearchList';

interface AddressSearchItemProps {
  element: Prediction;
}

export default function AddressSearchItem({ element }: AddressSearchItemProps) {
  return (
    <StyledItem>
      <BsFillBuildingFill size={20} />
      <StyledFlexContainer>
        <StyledItemTitle>{element.structured_formatting.main_text}</StyledItemTitle>
        <StyledItemContent>{element.structured_formatting.secondary_text}</StyledItemContent>
      </StyledFlexContainer>
    </StyledItem>
  );
}

const StyledItem = styled.li`
  display: flex;
  padding: 20px;
  cursor: pointer;
  align-items: center;
  line-height: 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledItemTitle = styled.div`
  font-size: 15px;
`;

const StyledItemContent = styled.div`
  font-size: 10px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
