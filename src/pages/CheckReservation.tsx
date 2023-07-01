import { useRecoilValue } from 'recoil';
import Alarm from '../components/shared/Alarm';
import ReviewModal from '../components/CheckReservation/Modal/ReviewModal';
import ReservationMain from '../components/CheckReservation/ReservationMain';
import { alarmAtoms } from '../recoil/modalAtoms';
import ReservationHeader from '../components/CheckReservation/ReservationHeader';

export default function Reservation() {
  const isAlarmOpen = useRecoilValue(alarmAtoms);
  return (
    <>
      <ReservationHeader />
      <ReservationMain />
      <ReviewModal />
      {isAlarmOpen && <Alarm message="리뷰가 작성됐습니다!" />}
    </>
  );
}
