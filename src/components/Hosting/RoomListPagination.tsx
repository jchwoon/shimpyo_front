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
  const [roomListPageNumber, setRoomListPageNumber] = useRecoilState(roomListPageState);
  const roomReservationStatus = useRecoilValue(roomReservationStatusState);

  const { responseData, sendRequest } = useAuthorizedRequest<any>({});

  const [roomListTotalPage, setRoomListTotalPage] = useRecoilState(roomListTotalPageState);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentPageRange, setCurrentPageRange] = useState<number[]>([]);

  const pageArr = Array.from({ length: roomListTotalPage }).map((_, idx) => idx + 1);

  const getPageRange = (start: number, end: number, arr: number[]) => {
    return arr.slice(start, end);
  };

  const getPrevPageNumber = async () => {
    if (currentPage === 0) return;
    if (currentPage % 10 === 0) {
      setCurrentPageRange(getPageRange(currentPage - 10, currentPage, pageArr));
    }
    setCurrentPage(preState => preState - 1);
    setRoomListPageNumber(preState => preState - 1);

    try {
      await sendRequest({
        url: `/user/reservations/houses/${selectedHouseId}?page=${
          currentPage - 1
        }&reservationStatus=${roomReservationStatus}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentPageNumber = (value: number) => async () => {
    setCurrentPage(value);
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
    if (currentPage === roomListTotalPage - 1) return;
    if ((currentPage + 1) % 10 === 0) {
      setCurrentPageRange(getPageRange(currentPage + 1, currentPage + 10, pageArr));
    }
    setCurrentPage(preState => preState + 1);
    setRoomListPageNumber(preState => preState + 1);
    try {
      await sendRequest({
        url: `/user/reservations/houses/${selectedHouseId}?page=${
          currentPage + 1
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
  }, [currentPage, responseData, setRoomList]);

  return (
    <StyledPaginationContainer>
      <StyledButton onClick={getPrevPageNumber}>{'<'}</StyledButton>

      {currentPageRange.map((value, idx) => {
        return (
          <StyledPageNumber onClick={getCurrentPageNumber(idx)} isSelected={currentPage === idx} key={idx}>
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
