import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  roomListPageState,
  roomListTotalPageState,
  roomReservationStatusState,
  selectedAccommodationIdState,
} from '../../recoil/hostingAtoms';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RoomDataType } from './HostingMain';
import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';

interface RoomListPaginationProps {
  setRoomList: Dispatch<SetStateAction<RoomDataType[]>>;
}

interface PageNumberProps {
  isSelected: boolean;
}

export default function RoomListPagination({ setRoomList }: RoomListPaginationProps) {
  const selectedHouseId = useRecoilValue(selectedAccommodationIdState);
  const roomReservationStatus = useRecoilValue(roomReservationStatusState);

  const { responseData, sendRequest } = useAuthorizedRequest<any>({});

  const [roomListTotalPage, setRoomListTotalPage] = useRecoilState(roomListTotalPageState);

  const [roomListPageNumber, setRoomListPageNumber] = useRecoilState(roomListPageState);
  const [currentPageRange, setCurrentPageRange] = useState<number[]>([]);

  const pageArr = Array.from({ length: roomListTotalPage }).map((_, idx) => idx + 1);

  const getPageRange = (start: number, end: number, arr: number[]) => {
    return arr.slice(start, end);
  };

  const getPrevPageNumber = async () => {
    if (roomListPageNumber === 0) return;
    if (roomListPageNumber % 10 === 0) {
      setCurrentPageRange(getPageRange(roomListPageNumber - 10, roomListPageNumber, pageArr));
    }
    setRoomListPageNumber(preState => preState - 1);

    try {
      await sendRequest({
        url: `/user/reservations/houses/${selectedHouseId}?page=${
          roomListPageNumber - 1
        }&reservationStatus=${roomReservationStatus}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentPageNumber = (value: number) => async () => {
    setRoomListPageNumber(value);
    try {
      await sendRequest({
        url: `/user/reservations/houses/${selectedHouseId}?page=${value}&reservationStatus=${roomReservationStatus}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getNextPageNumber = async () => {
    if (roomListPageNumber === roomListTotalPage - 1) return;
    if ((roomListPageNumber + 1) % 10 === 0) {
      setCurrentPageRange(getPageRange(roomListPageNumber + 1, roomListPageNumber + 10, pageArr));
    }
    setRoomListPageNumber(preState => preState + 1);
    try {
      await sendRequest({
        url: `/user/reservations/houses/${selectedHouseId}?page=${
          roomListPageNumber + 1
        }&reservationStatus=${roomReservationStatus}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCurrentPageRange(getPageRange(0, 10, pageArr));
  }, [roomListTotalPage]);

  useEffect(() => {
    if (!responseData) return;
    if (responseData?.isSuccess) {
      setRoomListTotalPage(responseData.result.totalPage);
      return setRoomList(responseData.result.reservationList);
    }
  }, [roomListPageNumber, responseData, setRoomList]);

  return (
    <StyledPaginationContainer>
      <StyledButton onClick={getPrevPageNumber}>{'<'}</StyledButton>

      {currentPageRange.map((value, idx) => {
        return (
          <StyledPageNumber onClick={getCurrentPageNumber(idx)} isSelected={roomListPageNumber === idx} key={idx}>
            {value}
          </StyledPageNumber>
        );
      })}
      <StyledButton onClick={getNextPageNumber}>{'>'}</StyledButton>
    </StyledPaginationContainer>
  );
}

const StyledPaginationContainer = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  font-weight: 600;
  border: 1px solid black;
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledPageNumber = styled.span<PageNumberProps>`
  cursor: pointer;
  padding: 5px;
  margin: 0 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: rgba(0,0,0,0.2);
  `}
`;
