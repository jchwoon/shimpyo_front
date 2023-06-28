import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

import { accommodationState, roomImageListState } from '../../../../recoil/atoms';

export default function AccommodationAddRoomItemButton() {
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);
  const [roomImageList, setRoomImageList] = useRecoilState(roomImageListState);
  const addRoomItem = () => {
    const newRoomImageList = [...roomImageList, []];
    const newAccommodation = {
      ...accommodation,
      room: [
        ...accommodation.room,
        {
          name: '',
          price: 0,
          minPeople: 0,
          maxPeople: 0,
          bedCount: 0,
          bedroomCount: 0,
          bathroomCount: 0,
          totalCount: 0,
          checkIn: '',
          checkOut: '',
          imageCount: 0,
        },
      ],
    };

    setAccommodation(newAccommodation);
    setRoomImageList(newRoomImageList);
  };

  return (
    <StyledButton onClick={addRoomItem}>
      <StyledPlusIcon />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 50px auto;
  font-size: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #00adb5;
  opacity: 0.4;

  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const StyledPlusIcon = styled(AiOutlinePlus)``;
