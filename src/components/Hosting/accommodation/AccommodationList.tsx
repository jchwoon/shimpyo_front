import styled from 'styled-components';
import AccommodationItem from './AccommodationItem';
import { AccommodationDataType, RoomDataType } from '../HostingMain';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useRecoilState } from 'recoil';
import {
  originalRoomListState,
  originalRoomListTotalPageState,
  roomListPageState,
  roomListTotalElementState,
  roomListTotalPageState,
  roomReservationStatusState,
  selectedAccommodationIdState,
} from '../../../recoil/hostingAtoms';

interface AccommodationListProps {
  data: AccommodationDataType[];
  setRoomList: Dispatch<SetStateAction<RoomDataType[]>>;
  setAccommodationList: Dispatch<SetStateAction<AccommodationDataType[]>>;
}

export default function AccommodationList({ data, setRoomList, setAccommodationList }: AccommodationListProps) {
  const { responseData: roomResponseData, sendRequest: roomRequest } = useAuthorizedRequest<any>({});
  const [originalRoomList, setOriginalRoomList] = useRecoilState(originalRoomListState);
  const [roomReservationStatus, setRoomReservationStatus] = useRecoilState(roomReservationStatusState);
  const [roomListTotalPage, setRoomListTotalPage] = useRecoilState(roomListTotalPageState);
  const [roomListTotalElement, setRoomListTotalElement] = useRecoilState(roomListTotalElementState);
  const [originalRoomListTotalPage, setOriginalRoomListTotalPage] = useRecoilState(originalRoomListTotalPageState);
  const [roomListPageNumber, setRoomListPageNumber] = useRecoilState(roomListPageState);

  const [selectedAccommodationId, setSelectedAccommodationId] = useRecoilState(selectedAccommodationIdState);
  const [selectedId, setSelectedId] = useState<number>(0);

  const getRoomInfo = (id: number) => async () => {
    setSelectedAccommodationId(id);
    setSelectedId(id);
    setRoomReservationStatus('USING');
    try {
      await roomRequest({ url: `user/reservations/houses/${id}?page=0/reservationStatus=USING` });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!roomResponseData) return;
    if (roomResponseData.isSuccess) {
      setRoomList(roomResponseData.result.reservationList);
      setOriginalRoomList(roomResponseData.result.reservationList);
      setRoomListTotalPage(roomResponseData.result.totalPage);
      setRoomListTotalElement(roomResponseData.result.totalElements);
      setOriginalRoomListTotalPage(roomResponseData.result.totalPage);
      setRoomListPageNumber(0);
    }
  }, [roomResponseData]);

  return (
    <>
      {data && data.length >= 1 ? (
        <StyledAccommodationContainer>
          {data?.map((accommodation, idx) => {
            return (
              <AccommodationItem
                key={`accommodation${idx}`}
                data={accommodation}
                setAccommodationList={setAccommodationList}
                isSelected={selectedId === accommodation.id}
                onClick={getRoomInfo(accommodation.id)}
              ></AccommodationItem>
            );
          })}
        </StyledAccommodationContainer>
      ) : (
        <StyledDiv>
          <StyledP>등록된 숙소가 없습니다.</StyledP>
        </StyledDiv>
      )}
    </>
  );
}

const StyledAccommodationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  box-sizing: border-box;
  padding: 25px;
  gap: 25px;
  width: 100%;
  height: 330px;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.05);
  margin-bottom: 50px;
  resize: vertical;
  overflow: auto;

  @media (min-width: 550px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 780px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 25px;
  width: 100%;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.05);
  margin-bottom: 50px;
`;

const StyledP = styled.p`
  font-size: 20px;
`;
