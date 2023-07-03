import { useRecoilValue } from 'recoil';
import Alarm from '../components/shared/Alarm';
import ReviewModal from '../components/Reservation/Modal/ReviewModal';
import ReservationHeader from '../components/Reservation/ReservationHeader';
import ReservationMain from '../components/Reservation/ReservationMain';
import { alarmAtoms } from '../recoil/modalAtoms';

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
