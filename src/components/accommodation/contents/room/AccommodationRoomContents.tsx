import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import AccommodationRoomItem from './AccommodationRoomItem';
import { accommodationState, disabledState, roomImageListState } from '../../../../recoil/accommodationAtoms';
import ContentsTitle from '../reuse/ContentsTitle';
import ContentsSubText from '../reuse/ContentsSubText';
import AccommodationAddRoomItemButton from './AccommodationAddRoomItemButton';

interface ClickProps {
  isClicked: boolean;
}

export default function AccommodationRoomContents() {
  const [isClicked, setIsClicked] = useState(false);
  const accommodation = useRecoilValue(accommodationState);
  const roomImageList = useRecoilValue(roomImageListState);

  const [disabled, setDisabled] = useRecoilState(disabledState);

  useEffect(() => {
    accommodation.rooms.forEach((room, idx) => {
      if (
        room.name &&
        room.price &&
        room.maxPeople &&
        room.minPeople &&
        room.bedroomCount &&
        room.bedCount &&
        room.bathroomCount &&
        room.totalCount &&
        room.checkIn &&
        room.checkOut &&
        roomImageList[idx].length > 0
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    });
  }, [setDisabled, accommodation.rooms, roomImageList]);

  return (
    <StyledFlexDiv isClicked={isClicked}>
      <ContentsTitle>객실을 등록해주세요</ContentsTitle>
      <ContentsSubText>각기 다른 조건을 가진 객실을 등록해보세요. 언제든 수정 가능합니다.</ContentsSubText>

      {accommodation.rooms.map((value, idx) => {
        return (
          <StyledRoomContentsContainer key={`item ${idx}`}>
            <AccommodationRoomItem idx={idx} setIsClicked={setIsClicked} />
          </StyledRoomContentsContainer>
        );
      })}

      <AccommodationAddRoomItemButton />
    </StyledFlexDiv>
  );
}

const StyledFlexDiv = styled.div<ClickProps>`
  display: flex;
  flex-direction: column;

  ${({ isClicked }) =>
    isClicked &&
    css`
      opacity: 1;
      animation: none;
    `}
`;

const StyledRoomContentsContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 50px;
  }
  background-color: #00acb51c;
  border-radius: 20px;
  box-shadow: 3px 2px 1px 1px rgba(0, 0, 0, 0.1);
`;
