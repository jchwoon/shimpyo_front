import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { accommodationDataState } from '../../../recoil/hostingManageAtoms';
import { AccommodationNameMap } from '../../../constants/accommodationType';

export default function AccommodationContents() {
  const accommodationData = useRecoilValue(accommodationDataState);

  return (
    <StyledContentsDiv>
      <StyledContentsContainer>
        <StyledContentsTitle>타입</StyledContentsTitle>
        <StyledContentsContent>
          {accommodationData.type} ({AccommodationNameMap[accommodationData.type]})
        </StyledContentsContent>
      </StyledContentsContainer>
      <StyledContentsContainer>
        <StyledContentsTitle>숙소이름</StyledContentsTitle>
        <StyledContentsContent>{accommodationData.name}</StyledContentsContent>
      </StyledContentsContainer>
      <StyledContentsContainer>
        <StyledContentsTitle>숙소설명</StyledContentsTitle>
        <StyledContentsContent>{accommodationData.contents}</StyledContentsContent>
      </StyledContentsContainer>
    </StyledContentsDiv>
  );
}

const StyledContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledContentsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 50px;

  &:last-child {
    padding: 0;
  }
`;

const StyledContentsTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  background-color: #212121;
  color: white;
  border-radius: 10px;
`;

const StyledContentsContent = styled.div`
  margin-left: 20px;
`;
