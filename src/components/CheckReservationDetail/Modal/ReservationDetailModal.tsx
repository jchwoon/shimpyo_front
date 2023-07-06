import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { reservationDetailModalAtom } from '../../../recoil/modalAtoms';
import { useSearchParams } from 'react-router-dom';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageSection from '../Section/ImageSection/ImageSection';
import DetailSection from '../Section/DetailSection';
import PaySection from '../Section/PaySection';

interface IResultData {
  houseId: number;
  reservationStatus: string;
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
}

export default function ReservationDetailModal() {
  const [reservationDetailModal, setReservationDetailModal] = useRecoilState(reservationDetailModalAtom);
  const [searchParams] = useSearchParams();
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});
  const [detailData, setDetailData] = useState<IResultData>({
    address: '',
    checkInDate: '',
    checkOutDate: '',
    existReview: false,
    houseId: 0,
    houseImageUrl: [''],
    houseName: '',
    houseOwnerId: 0,
    houseOwnerName: '',
    lat: 0,
    lng: 0,
    peopleCount: 0,
    price: '',
    remainPrice: '',
    reservationStatus: '',
    roomId: '',
    roomName: '',
    maxPeople: 0,
    minPeople: 0,
  });

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setDetailData(responseData.result);
    }
  }, [responseData]);

  useEffect(() => {
    const getData = async () => {
      await sendRequest({ url: `/user/reservations/${searchParams.get('reservationId')}` });
    };

    getData();
  }, [searchParams]);
  const body = (
    <div>
      <StyleMainBox>
        <StyleFlexBox>
          <StyleLeftBox>
            <StyleLeftContents>
              <StyleFlexColumnBox>
                <ImageSection
                  houseOwnerId={detailData.houseOwnerId}
                  imageList={detailData.houseImageUrl}
                  checkIn={detailData.checkInDate}
                  checkOut={detailData.checkOutDate}
                  houseId={detailData.houseId}
                  hostname={detailData.houseOwnerName}
                  isOver={true}
                />
                <DetailSection isOver={true} peopleCount={detailData.peopleCount} />
                <PaySection price={detailData.price} />
              </StyleFlexColumnBox>
            </StyleLeftContents>
          </StyleLeftBox>
        </StyleFlexBox>
      </StyleMainBox>
    </div>
  );
  return (
    <Modal
      body={body}
      label="예약 세부 정보"
      isOpen={reservationDetailModal}
      onClose={() => setReservationDetailModal(false)}
      nonPadding
    />
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
  width: 520px;
`;
const StyleLeftContents = styled.div`
  height: auto;
  background-color: hsl(0, 0%, 90%);
`;
