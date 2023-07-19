import { useRecoilState } from 'recoil';
import CheckReservationDetailHeader from '../components/CheckReservationDetail/Header/CheckReservationDetailHeader';
import CheckReservationDetailMain from '../components/CheckReservationDetail/Main/CheckReservationDetailMain';
import Alarm from '../components/shared/Alarm';
import { copyAddressAlarmAtoms } from '../recoil/alarmAtoms';

export default function CheckReservationDetail() {
  const [isCopyAddressAlarmOpen, setCopyAddressAlarmOpen] = useRecoilState(copyAddressAlarmAtoms);

  return (
    <>
      <CheckReservationDetailHeader />
      <CheckReservationDetailMain />
      {isCopyAddressAlarmOpen && <Alarm setAlarmState={setCopyAddressAlarmOpen} message="주소가 복사 되었습니다!" />}
    </>
  );
}
