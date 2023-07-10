import { useRecoilState, useSetRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { reservationCancelModalAtom } from '../../../recoil/modalAtoms';
import Button from '../../shared/UI/Button';
import ColorButton from '../../shared/UI/ColorButton';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { changeToMilliSeconds, formatCurrency, oneHour } from '../../../utils/changeFormat';
import { isOverCheckInAtom } from '../../../recoil/reservationAtom';

interface ReservationCancelModalProps {
  price: string;
  checkIn: string;
}

export default function ReservationCancelModal({ price, checkIn }: ReservationCancelModalProps) {
  const { codeNumber } = useParams();
  const [commission, setCommission] = useState(0);
  const setIsOverCheckIn = useSetRecoilState(isOverCheckInAtom);
  const [reservationCancelModal, setReservationCancelModal] = useRecoilState(reservationCancelModalAtom);
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const navigation = useNavigate();

  const cancelReservationHandler = async () => {
    await sendRequest({
      url: `/api/non-member-reservations/${codeNumber}`,
      method: 'PATCH',
      body: { refundAmount: +price - commission },
    });
  };

  useEffect(() => {
    const checkCommission = () => {
      if (!price || !checkIn) return;
      const checkInMilliValue = changeToMilliSeconds(checkIn);
      const currentMilliValue = new Date().getTime();
      const oneDay = 24 * oneHour * 30;

      if (currentMilliValue >= checkInMilliValue) {
        setIsOverCheckIn(true);
      } else {
        setIsOverCheckIn(false);
        if (checkInMilliValue - currentMilliValue < oneDay) {
          setCommission(parseInt(price, 10) * 0.1);
        } else {
          setCommission(parseInt(price, 10) * 0);
        }
      }
    };

    checkCommission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn, price]);

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      navigation('/reservations?category=reservation');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const title = <div>{`지금 예약 취소 시 취소 수수료 ${formatCurrency(commission)}원이 발생합니다.`}</div>;

  const body = (
    <div>
      <ul style={{ listStyle: 'disc', marginLeft: '2rem' }}>
        <li style={{ marginTop: '1rem' }}>{`결제 금액: ${formatCurrency(price)}`}</li>
        <li style={{ marginTop: '1rem' }}>{`취소 수수료: ${formatCurrency(commission)}`}</li>
        <li style={{ marginTop: '1rem' }}>{`최종 환불 금액: ${formatCurrency(+price - commission)}`}</li>
      </ul>
      <div style={{ marginTop: '1rem' }}>정말로 취소 하시겠습니까?</div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Button
          onClick={() => {
            setReservationCancelModal(false);
          }}
          label="아니요"
        />
        <ColorButton label="예" onClick={cancelReservationHandler} />
      </div>
    </div>
  );
  return (
    <Modal
      label="예약 취소"
      title={title}
      body={body}
      isOpen={reservationCancelModal}
      onClose={() => {
        setReservationCancelModal(false);
      }}
    />
  );
}
