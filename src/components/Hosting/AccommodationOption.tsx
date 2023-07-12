import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface AccommodationOptionProps {
  houseId: number;
}

export default function AccommodationOption({ houseId }: AccommodationOptionProps) {
  const navigate = useNavigate();
  const moveDetailPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/detail/${houseId}`);
  };

  return (
    <StyledOptionContainer>
      <StyledOption onClick={moveDetailPage}>숙소 새창열기</StyledOption>
      <StyledOption>숙소수정</StyledOption>
      <StyledOption>숙소삭제</StyledOption>
    </StyledOptionContainer>
  );
}

const StyledOptionContainer = styled.ul`
  position: absolute;
  display: grid;
  cursor: pointer;
  z-index: 9999;
  width: 100%;
  top: 40px;
  background-color: #d9d9d9;
  pointer-events: auto;
  cursor: default;

  height: calc(100% - 80px);
`;

const StyledOption = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #506272;
  font-weight: bold;
  cursor: pointer;

  & + & {
    border-top: 2px solid rgba(0, 0, 0, 0.4);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
