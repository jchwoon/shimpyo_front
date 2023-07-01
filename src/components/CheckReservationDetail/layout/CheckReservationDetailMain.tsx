import styled from 'styled-components';
import LocationMap from '../../shared/LocationMap';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ImageSection from '../Section/ImageSection/ImageSection';
import DetailSection from '../Section/DetailSection';
import GuideSection from '../Section/GuideSection';
import PaySection from '../Section/PaySection';

interface IResultData {
  reservationId: number;
  houseId: number;
  reservationStatus: string;
  houseImageUrl: string[];
  houseName: string;
  houseOwnerName: string;
  checkInDate: string;
  checkOutDate: string;
  roomId: string;
  roomName: string;
  peopleCount: string;
  lat: number;
  lng: number;
  address: string;
  price: string;
  remainPrice: string;
  existReview: boolean;
}

export default function CheckReservationDetailMain() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});
  const [detailData, setDetailData] = useState({
    reservationId: 6,
    houseId: 1,
    houseImageUrl: [
      '/images/logo.png',
      '/images/basicProfile.jpg',
      '/images/image.png',
      '/images/logo.png',
      '/images/basicProfile.jpg',
      '/images/image.png',
      '/images/logo.png',
      '/images/basicProfile.jpg',
      '/images/image.png',
    ],
    reservationStatus: 'ComPlete',
    houseName: 'ㅁㅁ 호텔',
    houseOwnerName: 'ONDA',
    checkInDate: '2023.06.13 16:00',
    checkOutDate: '2023.06.14 16:00',
    roomId: '5',
    roomName: '202호',
    peopleCount: '5',
    lat: 35.165024,
    lng: 126.858658,
    address: '서울 마포구 마포대로 58',
    price: '120000',
    remainPrice: '50000',
    existReview: true,
  });

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setDetailData(responseData.result);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      await sendRequest({ url: `/user/reservations/${searchParams.get('reservationId')}` });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyleMainBox>
      <StyleFlexBox>
        <StyleLeftBox>
          <StyleLeftContents>
            <StyleFlexColumnBox>
              <ImageSection
                imageList={detailData.houseImageUrl}
                checkIn={detailData.checkInDate}
                checkOut={detailData.checkOutDate}
                houseId={detailData.houseId}
                hostname={detailData.houseOwnerName}
              />
              <DetailSection reservationNumber={detailData.reservationId} peopleCount={detailData.peopleCount} />
              <GuideSection address={detailData.address} lat={detailData.lat} lng={detailData.lng} />
              <PaySection price={detailData.price} />
            </StyleFlexColumnBox>
          </StyleLeftContents>
        </StyleLeftBox>
        <StyleRightBox>
          <LocationMap latitude={detailData?.lat} longitude={detailData?.lng} height="100%" width="100%" />
        </StyleRightBox>
      </StyleFlexBox>
    </StyleMainBox>
  );
}

const StyleMainBox = styled.div`
  margin-top: 30px;
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
  margin-top: 17px;
  border-radius: 5px;
  width: 100%;

  @media only screen and (min-width: 738px) {
    width: 400px;
    margin: 1.7rem 0.7rem 0.7rem 0.7rem;
    height: calc(100vh - 105px);
    overflow-y: scroll;
  }
  @media only screen and (min-width: 1130px) {
    width: 600px;
    margin: 1.7rem 0.7rem 0.7rem 0.7rem;
    height: calc(100vh - 105px);
    overflow-y: scroll;
  }
`;
const StyleRightBox = styled.div`
  margin-top: 1.1rem;
  height: calc(100vh - 80px);
  flex-grow: 1;
`;

const StyleLeftContents = styled.div`
  height: auto;
  background-color: hsl(0, 0%, 90%);
`;
