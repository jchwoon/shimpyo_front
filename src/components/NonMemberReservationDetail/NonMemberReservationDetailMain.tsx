import { useParams } from 'react-router-dom';

import LocationMap from '../shared/LocationMap';
import NotFound from '../../pages/404';
import { useEffect, useState } from 'react';
import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';
import styled from 'styled-components';
import ImageSection from './Section/ImageSection/ImageSection';
import DetailSection from './Section/DetailSection';
import GuideSection from './Section/GuideSection';
import PaySection from './Section/PaySection';
import GuestManageModal from './Modal/GuestManageModal';
import ReservationCancelModal from './Modal/ReservationCancelModal';
import LoginModal from '../shared/Modal/LoginModal';
import JoinModal from '../shared/Modal/JoinModal';

export type State = 'COMPLETE' | 'USING' | 'FINISHED' | 'CANCEL';

interface IResultData {
  houseId: number;
  reservationStatus: State;
  houseImageUrl: string[];
  houseName: string;
  houseOwnerName: string;
  checkInDate: string;
  checkOutDate: string;
  roomId: string;
  roomName: string;
  peopleCount: number;
  maxPeople: number;
  minPeople: number;
  lat: number;
  lng: number;
  address: string;
  price: string;
  remainPrice: string;
  existReview: boolean;
  houseOwnerId: number;
  reservationId: number;
}

export default function NonMemberReservationDetailMain() {
  const { codeNumber } = useParams();
  const [isValidCodeNumber, setIsValidCodeNumber] = useState(true);
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});
  const [detailData, setDetailData] = useState<IResultData>({
    address: '',
    checkInDate: '',
    checkOutDate: '',
    existReview: false,
    houseId: 0,
    houseImageUrl: [],
    houseName: '',
    houseOwnerId: 0,
    houseOwnerName: '',
    lat: 0,
    lng: 0,
    peopleCount: 0,
    price: '',
    remainPrice: '',
    reservationStatus: 'COMPLETE',
    roomId: '',
    roomName: '',
    maxPeople: 0,
    minPeople: 0,
    reservationId: 0,
  });

  const getData = async () => {
    await sendRequest({ url: `/api/non-member-reservations/${codeNumber}` });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setDetailData(responseData.result);
    } else {
      // if (responseData.code === 3100)
      setIsValidCodeNumber(false);
    }
  }, [responseData]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isValidCodeNumber) {
    return <NotFound />;
  }
  return (
    <>
      <StyleMainBox>
        <StyleFlexBox>
          <StyleLeftBox>
            <StyleLeftContents>
              <StyleFlexColumnBox>
                <ImageSection
                  reservationStatus={detailData.reservationStatus}
                  houseOwnerId={detailData.houseOwnerId}
                  imageList={detailData.houseImageUrl}
                  checkIn={detailData.checkInDate}
                  checkOut={detailData.checkOutDate}
                  houseId={detailData.houseId}
                  hostname={detailData.houseOwnerName}
                />
                <DetailSection
                  reservationStatus={detailData.reservationStatus}
                  peopleCount={detailData.peopleCount}
                  reservationId={detailData.reservationId}
                  isOver={detailData.reservationStatus === 'FINISHED' || detailData.reservationStatus === 'CANCEL'}
                />
                {(detailData.reservationStatus === 'COMPLETE' || detailData.reservationStatus === 'USING') && (
                  <GuideSection address={detailData.address} lat={detailData.lat} lng={detailData.lng} />
                )}
                <PaySection price={detailData.price} />
              </StyleFlexColumnBox>
            </StyleLeftContents>
          </StyleLeftBox>
          <StyleRightBox>
            <LocationMap latitude={detailData?.lat} longitude={detailData?.lng} height="100%" width="100%" />
          </StyleRightBox>
        </StyleFlexBox>
      </StyleMainBox>
      <GuestManageModal
        getData={getData}
        minPeople={detailData.minPeople}
        maxPeople={detailData.maxPeople}
        peopleCount={detailData.peopleCount}
      />
      <ReservationCancelModal price={detailData.price} checkIn={detailData.checkInDate} />
      <LoginModal />
      <JoinModal />
    </>
  );
}

const StyleMainBox = styled.div`
  background-color: hsl(0, 0%, 90%);
`;

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyleFlexColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleLeftBox = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 100%;

  @media only screen and (min-width: 738px) {
    width: 400px;
    margin: 0.7rem 0.7rem 0.7rem 0.7rem;
    height: calc(100vh - 105px);
    overflow-y: scroll;
  }
  @media only screen and (min-width: 1130px) {
    width: 600px;
    margin: 0.7rem 0.7rem 0.7rem 0.7rem;
    height: calc(100vh - 105px);
    overflow-y: scroll;
  }
`;
const StyleRightBox = styled.div`
  height: calc(100vh - 80px);
  flex-grow: 1;
`;

const StyleLeftContents = styled.div`
  height: auto;
  background-color: hsl(0, 0%, 90%);
`;
