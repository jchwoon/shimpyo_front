import { useRecoilValue } from 'recoil';
import CheckReservationDetailHeader from '../components/CheckReservationDetail/layout/CheckReservationDetailHeader';
import CheckReservationDetailMain from '../components/CheckReservationDetail/layout/CheckReservationDetailMain';
import Alarm from '../components/shared/Alarm';
import { alarmAtoms } from '../recoil/modalAtoms';

export default function CheckReservationDetail() {
  const isAlarmOpen = useRecoilValue(alarmAtoms);

  return (
    <>
      <CheckReservationDetailHeader />
      <CheckReservationDetailMain />
      {isAlarmOpen && <Alarm message="주소가 복사 되었습니다!" />}
    </>
  );
}
