import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { useState, useEffect } from 'react';
import {
  additionalInfoModalAtom,
  emailValueAtom,
  nicknameValueAtom,
  passwordValueAtom,
  phoneValueAtom,
} from '../../../recoil/atom';
import styled from 'styled-components';
import NicknameInput from '../Input/NicknameInput';
import ColorButton from '../../shared/UI/ColorButton';
import PhoneInput from '../Input/PhoneInput';
import useHttpRequest from '../../../hooks/useHttpRequest';

interface ResultData {
  name: string;
  age: number;
  email: string;
}

export default function AdditionalInfoModal() {
  const { isLoading, responseData, sendRequest } = useHttpRequest<ResultData>();
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useRecoilState(additionalInfoModalAtom);

  const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
  const [emailValue, setEmailValue] = useRecoilState(emailValueAtom);
  const [passwordValue, setPasswordValue] = useRecoilState(passwordValueAtom);
  const [nicknameValue, setNicknameValue] = useRecoilState(nicknameValueAtom);

  const isValid = isNicknameValid && isPhoneValid;

  console.log(isNicknameValid, isPhoneValid);
  const getNicknameValid = (valid: boolean) => {
    setIsNicknameValid(valid);
  };

  const getPhoneValid = (valid: boolean) => {
    setIsPhoneValid(valid);
  };

  const handleSubmitUserInfo = async () => {
    try {
      await sendRequest({
        url: '/public/join',
        body: { email: emailValue, password: passwordValue, nickname: nicknameValue, phoneNumber: phoneValue },
        method: 'POST',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (responseData?.isSuccess) {
      alert('홈페이지로 이동 또는 로그인 모달');
      setEmailValue('');
      setPasswordValue('');
      setNicknameValue('');
      setPhoneValue('');
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
      onClose={() => setIsAdditionalInfoModalOpen(false)}
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
