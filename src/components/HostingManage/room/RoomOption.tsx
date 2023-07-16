import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { roomDataState } from '../../../recoil/hostingManageAtoms';

interface RoomOptionProps {
  idx: number;
}

export default function RoomOption({ idx }: RoomOptionProps) {
  const roomData = useRecoilValue(roomDataState);

  return (
    <StyledRoomOptionContainer>
      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`name${idx}`}>객실 이름</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].name}</StyledInput>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`price${idx}`}>가격</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].price.toLocaleString()}원</StyledInput>
        </StyledInputContainer>
      </StyledFlexDiv>
      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`minPeople${idx}`}>최소인원</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].minPeople}명</StyledInput>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`maxPeople${idx}`}>최대인원</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].maxPeople}명</StyledInput>
        </StyledInputContainer>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`bedroom${idx}`}>침실 수</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].bedroomCount}개</StyledInput>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`bed${idx}`}>침대 수</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].bedCount}개</StyledInput>
        </StyledInputContainer>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`bathroom${idx}`}>욕실 수</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].bathroomCount}개</StyledInput>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`total${idx}`}>총 객실 수</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].totalCount}개</StyledInput>
        </StyledInputContainer>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`checkIn${idx}`}>체크인 시간</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].checkIn}</StyledInput>
        </StyledInputContainer>

        <StyledInputContainer>
          <StyledLabel htmlFor={`checkOut${idx}`}>체크아웃 시간</StyledLabel>
          <StyledInput id={`${`name${idx}`}`}>{roomData[idx].checkOut}</StyledInput>
        </StyledInputContainer>
      </StyledFlexDiv>
    </StyledRoomOptionContainer>
  );
}

const StyledRoomOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 90%;
  padding: 20px;
  box-sizing: content-box;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;

  @media (min-width: 635px) {
    width: 50%;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
  margin-bottom: 5px;
`;

const StyledInput = styled.div`
  border: none;
  width: 150px;
  height: 100%;
  margin-top: 10px;
  box-sizing: border-box;
`;

const StyledFlexDiv = styled.div`
  display: flex;
`;

const StyledInputContainer = styled.div`
  padding: 5px;
  margin-bottom: 15px;
  &:nth-child(2) {
    margin-left: 20px;
  }
`;
