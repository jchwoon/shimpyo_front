import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Main from '../layout/Main';

import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';

import { AccommodationType } from '../../constants/accommodationType';
import { ACCOMMODATION_API } from '../../constants/api/accommodationApi';

import AccommodationRegistrationButton from './accommodation/AccommodationRegistrationButton';
import AccommodationList from './accommodation/AccommodationList';
import RoomList from './room/RoomList';
import AccommodationFilter from './accommodation/AccommodationFilter';
import { useRecoilState, useRecoilValue } from 'recoil';
import { originalAccommodationListState, roomListTotalElementState } from '../../recoil/hostingAtoms';
import RoomFilter from './room/RoomFilter';
import RoomListPagination from './room/RoomListPagination';

export interface AccommodationDataType {
  id: number;
  name: string;
  imageUrl: string;
  houseType: keyof AccommodationType;
}

export interface RoomDataType {
  reservationId: number;
  reservationStatus: 'COMPLETE' | 'USING' | 'FINISHED';
  roomImageUrl: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  personName: string;
  peopleCount: number;
  phoneNumber: string;
}

export default function HostingMain() {
  const [originalAccommodationList, setOriginalAccommodationList] = useRecoilState(originalAccommodationListState);
  const roomListTotalElement = useRecoilValue(roomListTotalElementState);

  const [accommodationList, setAccommodationList] = useState<AccommodationDataType[]>([]);
  const [roomList, setRoomList] = useState<RoomDataType[]>([]);

  const { responseData, sendRequest } = useAuthorizedRequest<any>({});

  useEffect(() => {
    if (responseData) {
      setAccommodationList(responseData.result);
      return setOriginalAccommodationList(responseData.result);
    }
    const fetchData = async () => {
      try {
        await sendRequest({ url: ACCOMMODATION_API });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [responseData]);

  return (
    <Main>
      <StyledHostingContainer>
        <StyledTitle>숙소 관리</StyledTitle>
        <StyledFlexDiv>
          <StyledSubTitle>등록된 숙소 ({accommodationList?.length})</StyledSubTitle>
          <AccommodationRegistrationButton>숙소 새로 등록하기</AccommodationRegistrationButton>
        </StyledFlexDiv>
        <AccommodationFilter setAccommodationList={setAccommodationList} setRoomList={setRoomList} />
        <AccommodationList
          data={accommodationList}
          setRoomList={setRoomList}
          setAccommodationList={setAccommodationList}
        />

        <StyledSubTitle>예약 객실 현황 ({roomListTotalElement})</StyledSubTitle>
        <RoomFilter setRoomList={setRoomList} />
        <RoomList data={roomList} />
        <RoomListPagination setRoomList={setRoomList} />
      </StyledHostingContainer>
    </Main>
  );
}

const StyledHostingContainer = styled.div`
  padding: 50px 10px;
`;

const StyledTitle = styled.h1`
  width: 100%;
  margin: 0 auto;
  font-size: 40px;
  font-weight: 500;
`;

const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0 20px 0;
`;

const StyledSubTitle = styled.h2`
  font-size: 25px;
`;
