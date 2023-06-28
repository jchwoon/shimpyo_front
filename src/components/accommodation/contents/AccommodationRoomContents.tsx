import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import AccommodationRoomItem from './AccommodationRoomItem';
import { accommodationState } from '../../../recoil/atoms';
import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import AccommodationAddRoomItemButton from './AccommodationAddRoomItemButton';

export default function AccommodationRoomContents() {
  const accommodation = useRecoilValue(accommodationState);

  return (
    <StyledFlexDiv>
      <ContentsTitle>객실을 등록해주세요</ContentsTitle>
      <ContentsSubText>각기 다른 조건을 가진 객실을 등록해보세요. 언제든 수정 가능합니다.</ContentsSubText>

      {accommodation.room.map((value, idx) => {
        return (
          <StyledRoomContentsContainer key={`item ${idx}`}>
            <AccommodationRoomItem idx={idx} />
          </StyledRoomContentsContainer>
        );
      })}

      <AccommodationAddRoomItemButton />
    </StyledFlexDiv>
  );
}

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRoomContentsContainer = styled.div`
  width: 700px;
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 50px;
  }
`;
