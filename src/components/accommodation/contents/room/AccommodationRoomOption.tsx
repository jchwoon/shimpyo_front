import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { accommodationState } from '../../../../recoil/accommodationAtoms';
import { RoomDataProps } from './AccommodationRoomItem';
import { ChangeEvent } from 'react';

export default function AccommodationRoomOption({ idx, setIsClicked }: RoomDataProps) {
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newAccommodation = { ...accommodation };
    if (!['name', 'checkIn', 'checkOut'].includes(name)) {
      if (name === 'maxPeople' && newAccommodation.rooms[idx].minPeople > parseInt(value)) {
        const newRoom = { ...newAccommodation.rooms[idx], [name]: newAccommodation.rooms[idx].minPeople };
        newAccommodation.rooms = [...newAccommodation.rooms];
        newAccommodation.rooms[idx] = newRoom;
      } else {
        const newRoom = { ...newAccommodation.rooms[idx], [name]: parseInt(value) };
        newAccommodation.rooms = [...newAccommodation.rooms];
        newAccommodation.rooms[idx] = newRoom;
      }
    } else {
      const newRoom = { ...newAccommodation.rooms[idx], [name]: value };
      newAccommodation.rooms = [...newAccommodation.rooms];
      newAccommodation.rooms[idx] = newRoom;
    }

    setAccommodation(newAccommodation);
  };

  return (
    <StyledRoomOptionContainer>
      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`name${idx}`}>객실 이름</StyledLabel>
          <StyledInput
            name="name"
            id={`${`name${idx}`}`}
            type="text"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].name}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`price${idx}`}>가격</StyledLabel>
          <StyledInput
            name="price"
            id={`price${idx}`}
            type="number"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].price}
            min={1}
          />
        </StyledInputContainer>
      </StyledFlexDiv>
      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`minPeople${idx}`}>최소인원</StyledLabel>
          <StyledInput
            id={`minPeople${idx}`}
            name="minPeople"
            type="number"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].minPeople}
            min={1}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`maxPeople${idx}`}>최대인원</StyledLabel>
          <StyledInput
            id={`maxPeople${idx}`}
            name="maxPeople"
            type="number"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].maxPeople}
            min={accommodation.rooms[idx].minPeople}
          />
        </StyledInputContainer>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`bedroom${idx}`}>침실 수</StyledLabel>
          <StyledInput
            id={`bedroom${idx}`}
            name="bedroomCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].bedroomCount}
            min={0}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`bed${idx}`}>침대 수</StyledLabel>
          <StyledInput
            id={`bed${idx}`}
            name="bedCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].bedCount}
            min={0}
          />
        </StyledInputContainer>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`bathroom${idx}`}>욕실 수</StyledLabel>
          <StyledInput
            id={`bathroom${idx}`}
            name="bathroomCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].bathroomCount}
            min={0}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor={`total${idx}`}>총 객실 수</StyledLabel>
          <StyledInput
            id={`total${idx}`}
            name="totalCount"
            type="number"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].totalCount}
            min={1}
          />
        </StyledInputContainer>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <StyledInputContainer>
          <StyledLabel htmlFor={`checkIn${idx}`}>체크인 시간</StyledLabel>
          <StyledInput
            id={`checkIn${idx}`}
            name="checkIn"
            type="time"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].checkIn}
            placeholder="17:00"
            maxLength={5}
          />
        </StyledInputContainer>

        <StyledInputContainer>
          <StyledLabel htmlFor={`checkOut${idx}`}>체크아웃 시간</StyledLabel>
          <StyledInput
            id={`checkOut${idx}`}
            name="checkOut"
            type="time"
            onChange={handleOnChange}
            value={accommodation.rooms[idx].checkOut}
            placeholder="13:00"
            maxLength={5}
          />
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

  @media (min-width: 680px) {
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

const StyledInput = styled.input`
  border: none;
  width: 100%;
  height: 90%;
  box-shadow: 3px 3px 1px 1px rgba(0, 0, 0, 0.1);
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
