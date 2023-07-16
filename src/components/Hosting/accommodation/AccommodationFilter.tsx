import styled from 'styled-components';
import { AccommodationIconMap } from '../../../constants/accommodationType';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  originalAccommodationListState,
  originalRoomListState,
  roomListTotalElementState,
  roomListTotalPageState,
  roomReservationStatusState,
  selectedAccommodationIdState,
} from '../../../recoil/hostingAtoms';
import { AccommodationDataType, RoomDataType } from '../HostingMain';

interface ButtonProps {
  active: boolean;
}

interface AccommodationFilterProps {
  setAccommodationList: Dispatch<SetStateAction<AccommodationDataType[]>>;
  setRoomList: Dispatch<SetStateAction<RoomDataType[]>>;
}

export default function AccommodationFilter({ setAccommodationList, setRoomList }: AccommodationFilterProps) {
  const originAccommodationList = useRecoilValue(originalAccommodationListState);
  const [selectedAccommodationId, setSelectedAccommodationId] = useRecoilState(selectedAccommodationIdState);
  const [roomReservationStatus, setRoomReservationStatus] = useRecoilState(roomReservationStatusState);
  const [roomListTotalPage, setRoomListTotalPage] = useRecoilState(roomListTotalPageState);
  const [roomListTotalElement, setRoomListTotalElement] = useRecoilState(roomListTotalElementState);
  const [originalRoomList, setOriginalRoomList] = useRecoilState(originalRoomListState);

  const [activeButton, setActiveButton] = useState('ALL');

  const handleButtonClick = (accommodationType: string) => {
    setSelectedAccommodationId(0);
    setRoomList([]);
    setOriginalRoomList([]);
    setRoomReservationStatus('USING');
    setRoomListTotalPage(0);
    setRoomListTotalElement(0);

    if (activeButton === accommodationType) {
      setActiveButton('ALL');
      setAccommodationList(originAccommodationList);
    } else {
      setActiveButton(accommodationType);

      if (originAccommodationList.length > 0) {
        const newAccommodationList = [...originAccommodationList];
        const filteredNewAccommodationList = newAccommodationList.filter(
          accommodation => accommodation.houseType === accommodationType,
        );
        setAccommodationList(filteredNewAccommodationList);
      }
    }
  };

  return (
    <StyledFilterContainer>
      <StyledFilterButton active={activeButton === 'GUEST'} onClick={() => handleButtonClick('GUEST')}>
        {AccommodationIconMap.GUEST}
        <p>게스트하우스</p>
      </StyledFilterButton>
      <StyledFilterButton active={activeButton === 'HOTEL'} onClick={() => handleButtonClick('HOTEL')}>
        {AccommodationIconMap.HOTEL}
        <p>호텔</p>
      </StyledFilterButton>
      <StyledFilterButton active={activeButton === 'MOTEL'} onClick={() => handleButtonClick('MOTEL')}>
        {AccommodationIconMap.MOTEL}
        <p>모텔</p>
      </StyledFilterButton>
      <StyledFilterButton active={activeButton === 'PENSION'} onClick={() => handleButtonClick('PENSION')}>
        {AccommodationIconMap.PENSION}
        <p>펜션</p>
      </StyledFilterButton>
    </StyledFilterContainer>
  );
}

const StyledFilterContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const StyledFilterButton = styled.button<ButtonProps>`
  padding: 10px;
  border: 2px solid black;
  cursor: pointer;

  &:first-child {
    border-radius: 20px 0 0 20px;
  }

  &:last-child {
    border-radius: 0 20px 20px 0;
  }

  & + & {
    border-left: 1px solid black;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  transition: all 0.2s ease-in-out;
  transform: translateY(${({ active }) => (active ? '5px' : '0')});
  background-color: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.1)' : 'transparent')};
`;
