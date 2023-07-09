import { useEffect } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import Modal from '../../shared/Modal';
import Button from '../../shared/UI/Button';
import ColorButton from '../../shared/UI/ColorButton';
import { useRecoilState } from 'recoil';
import { accountDeActivationModalAtom } from '../../../recoil/modalAtoms';
import { accountDeactivationRejectedAlarmAtom } from '../../../recoil/alarmAtoms';
import Alarm from '../../shared/Alarm';
import { USER_ACCOUNT_API_PATH } from '../../../constants/api/userApi';

export default function DeactivationModal() {
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const [accountDeactivationModal, setAccountDeactivationModal] = useRecoilState(accountDeActivationModalAtom);
  const [accountDeactivationRejectedAlram, setAccountDeactivationRejectedAlram] = useRecoilState(
    accountDeactivationRejectedAlarmAtom,
  );
  const onClickDeleteAccount = async () => {
    await sendRequest({ url: `${USER_ACCOUNT_API_PATH}`, method: 'DELETE' });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      window.location.href = '/';
    } else if (responseData.code === 3107) {
      setAccountDeactivationRejectedAlram(true);
      setAccountDeactivationModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const body = (
    <div style={{ marginTop: '30px' }}>
      <ul style={{ listStyle: 'circle', marginLeft: '30px' }}>
        <li>이 계정과 관련한 프로필과 숙소 정보가 삭제됩니다.</li>
        <li style={{ marginTop: '10px' }}>향후 계정 정보나 이전 예약을 확인할 수 없습니다.</li>
      </ul>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Button label="아니요" onClick={() => setAccountDeactivationModal(false)} />
        <ColorButton label="예" onClick={onClickDeleteAccount} />
      </div>
    </div>
  );
  return (
    <>
      <Modal
        label="계정 비활성화"
        title="계정을 비활성화하시겠어요?"
        body={body}
        isOpen={accountDeactivationModal}
        onClose={() => setAccountDeactivationModal(false)}
      />
      {accountDeactivationRejectedAlram && (
        <Alarm setAlarmState={setAccountDeactivationRejectedAlram} message="현재 예약된 숙소가 존재합니다" />
      )}
    </>
  );
}
