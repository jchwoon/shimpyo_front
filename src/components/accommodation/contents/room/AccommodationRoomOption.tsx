import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { accommodationState } from '../../../../recoil/atoms';
import { RoomDataProps } from './AccommodationRoomItem';
import { ChangeEvent } from 'react';

export default function AccommodationRoomOption({ idx }: RoomDataProps) {
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newAccommodation = { ...accommodation };
    const newRoom = { ...newAccommodation.room[idx], [name]: value };
    newAccommodation.room = [...newAccommodation.room];
    newAccommodation.room[idx] = newRoom;

    setAccommodation(newAccommodation);
  };

  return (
    <StyledRoomOptionContainer>
      <StyledLabel>
        객실 이름
        <input
          name="name"
          id={`${Math.random()}`}
          type="text"
          onChange={handleOnChange}
          value={accommodation.room[idx].name}
        />
      </StyledLabel>
      <StyledLabel>
        가격
        <input
          name="price"
          id={`${Math.random()}`}
          type="number"
          onChange={handleOnChange}
          value={accommodation.room[idx].price}
        />
      </StyledLabel>
      <StyledFlexDiv>
        <StyledLabel>
          최소인원
          <StyledNumberInput
            id={`${Math.random()}`}
            name="minPeople"
            type="number"
            onChange={handleOnChange}
            value={accommodation.room[idx].minPeople}
          />
        </StyledLabel>
        <StyledLabel>
          최대인원
          <StyledNumberInput
            id={`${Math.random()}`}
            name="maxPeople"
            type="number"
            onChange={handleOnChange}
            value={accommodation.room[idx].maxPeople}
          />
        </StyledLabel>
      </StyledFlexDiv>
      <StyledFlexDiv>
        <StyledLabel>
          침실 수
          <StyledNumberInput
            id={`${Math.random()}`}
            name="bedroomCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.room[idx].bedroomCount}
          />
        </StyledLabel>
        <StyledLabel>
          침대 수
          <StyledNumberInput
            id={`${Math.random()}`}
            name="bedCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.room[idx].bedCount}
          />
        </StyledLabel>
      </StyledFlexDiv>
      <StyledFlexDiv>
        <StyledLabel>
          욕실 수
          <StyledNumberInput
            id={`${Math.random()}`}
            name="bathroomCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.room[idx].bathroomCount}
          />
        </StyledLabel>
        <StyledLabel>
          총 객실 수
          <StyledNumberInput
            id={`${Math.random()}`}
            name="totalCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.room[idx].totalCount}
          />
        </StyledLabel>
      </StyledFlexDiv>
      <StyledLabel>
        체크인 시간
        <input
          id={`${Math.random()}`}
          name="checkIn"
          type="text"
          onChange={handleOnChange}
          value={accommodation.room[idx].checkIn}
          placeholder="17:00"
        />
      </StyledLabel>
      <StyledLabel>
        체크아웃 시간
        <input
          id={`${Math.random()}`}
          name="checkOut"
          type="text"
          onChange={handleOnChange}
          value={accommodation.room[idx].checkOut}
          placeholder="13:00"
        />
      </StyledLabel>
    </StyledRoomOptionContainer>
  );
}

const StyledRoomOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 40px;
  width: 40%;
`;
const StyledLabel = styled.label`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
`;

const StyledNumberInput = styled.input`
  width: 30%;
`;

const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
