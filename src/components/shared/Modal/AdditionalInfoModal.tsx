import { useRecoilState, useSetRecoilState } from 'recoil';
import Modal from '../Modal';
import { useState, useEffect } from 'react';
import { additionalInfoModalAtom, loginModalAtom } from '../../../recoil/modalAtoms';
import { emailValueAtom, nicknameValueAtom, passwordValueAtom, phoneValueAtom } from '../../../recoil/userAtoms';
import styled from 'styled-components';
import NicknameInput from '../../Main/Input/NicknameInput';
import ColorButton from '../UI/ColorButton';
import PhoneInput from '../../Main/Input/PhoneInput';
import useHttpRequest from '../../../hooks/useHttpRequest';
import { JOIN_API_PATH } from '../../../constants/api/userApi';

export default function AdditionalInfoModal() {
  const { isLoading, responseData, sendRequest } = useHttpRequest();
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useRecoilState(additionalInfoModalAtom);
  const setIsLoginModalOpen = useSetRecoilState(loginModalAtom);

  const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
  const [emailValue, setEmailValue] = useRecoilState(emailValueAtom);
  const [passwordValue, setPasswordValue] = useRecoilState(passwordValueAtom);
  const [nicknameValue, setNicknameValue] = useRecoilState(nicknameValueAtom);

  const isValid = isNicknameValid && isPhoneValid;

  const getNicknameValid = (valid: boolean) => {
    setIsNicknameValid(valid);
  };

  const getPhoneValid = (valid: boolean) => {
    setIsPhoneValid(valid);
  };

  const handleSubmitUserInfo = async () => {
    await sendRequest({
      url: `${JOIN_API_PATH}`,
      body: { email: emailValue, password: passwordValue, nickname: nicknameValue, phoneNumber: phoneValue },
      method: 'POST',
    });
  };
  const initialState = () => {
    setNicknameValue('');
    setPhoneValue('');
    setEmailValue('');
    setPasswordValue('');
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData?.isSuccess) {
      setIsAdditionalInfoModalOpen(false);
      setIsLoginModalOpen(true);
      initialState();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);
  const body = (
    <StyleBody>
      <NicknameInput getValid={getNicknameValid} />
      <PhoneInput getValid={getPhoneValid} />
      <ColorButton disabled={!isValid || isLoading} label="가입" onClick={handleSubmitUserInfo} />
    </StyleBody>
  );
  return (
    <Modal
      onClose={() => {
        setIsAdditionalInfoModalOpen(false);
        initialState();
      }}
      title="추가적으로 정보를 입력해주세요."
      body={body}
      isOpen={isAdditionalInfoModalOpen}
      label="추가 정보"
    />
  );
}

const StyleBody = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;
