import styled from 'styled-components';
import StatusBadge from './StatusBadge';
import CheckMark from '../reuse/CheckMark';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  originalRoomListState,
  originalRoomListTotalPageState,
  roomListPageState,
  roomListTotalElementState,
  roomListTotalPageState,
  roomReservationStatusState,
  selectedAccommodationIdState,
} from '../../../recoil/hostingAtoms';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { RoomDataType } from '../HostingMain';

interface BadgeContainerProps {
  active: boolean;
}

interface RoomFilterProps {
  setRoomList: Dispatch<SetStateAction<RoomDataType[]>>;
}

export default function RoomFilter({ setRoomList }: RoomFilterProps) {
  const originalRoomList = useRecoilValue(originalRoomListState);
  const selectedHouseId = useRecoilValue(selectedAccommodationIdState);
  const [roomListTotalPage, setRoomListTotalPage] = useRecoilState(roomListTotalPageState);
  const [roomListTotalElement, setRoomListTotalElement] = useRecoilState(roomListTotalElementState);
  const originalRoomListTotalPage = useRecoilValue(originalRoomListTotalPageState);

  const { responseData, sendRequest } = useAuthorizedRequest<any>({});

  const [roomListPageNumber, setRoomListPageNumber] = useRecoilState(roomListPageState);
  const [roomReservationStatus, setRoomReservationStatus] = useRecoilState(roomReservationStatusState);

  const handleBadgeClick = async (status: string) => {
    if (roomReservationStatus === status) {
      setRoomList(originalRoomList);
      setRoomReservationStatus('USING');
      setRoomListTotalPage(originalRoomListTotalPage);
      setRoomListPageNumber(0);
    } else {
      setRoomReservationStatus(status);
      setRoomListPageNumber(0);
      try {
        await sendRequest({
          url: `/user/reservations/houses/${selectedHouseId}?page=0&reservationStatus=${status}`,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (!responseData) {
      return setRoomList([]);
    }
    if (responseData.isSuccess) {
      setRoomList(responseData.result.reservationList);
      setRoomListTotalPage(responseData.result.totalPage);
      setRoomListTotalElement(responseData.result.totalElements);
    }
  }, [responseData]);

  return (
    <StyledFilterContainer>
      <StyledBadgeContainer active={roomReservationStatus === 'COMPLETE'} onClick={() => handleBadgeClick('COMPLETE')}>
        {roomReservationStatus === 'COMPLETE' && <CheckMark />}
        <StatusBadge status="COMPLETE"></StatusBadge>
      </StyledBadgeContainer>
      <StyledBadgeContainer active={roomReservationStatus === 'USING'} onClick={() => handleBadgeClick('USING')}>
        {roomReservationStatus === 'USING' && <CheckMark />}
        <StatusBadge status="USING"></StatusBadge>
      </StyledBadgeContainer>
      <StyledBadgeContainer active={roomReservationStatus === 'FINISHED'} onClick={() => handleBadgeClick('FINISHED')}>
        {roomReservationStatus === 'FINISHED' && <CheckMark />}
        <StatusBadge status="FINISHED"></StatusBadge>
      </StyledBadgeContainer>
    </StyledFilterContainer>
  );
}

const StyledFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 270px;
  margin: 30px;
`;

const StyledBadgeContainer = styled.div<BadgeContainerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @keyframes click {
    to {
      transform: translateY(0);
    }
    from {
      transform: translateY(20%);
    }
  }

  ${({ active }) =>
    active &&
    `animation: click 1s backwards;
  `}
`;
