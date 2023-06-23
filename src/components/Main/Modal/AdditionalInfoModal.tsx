import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { useState, useEffect } from 'react';
import {
  additionalInfoModalAtom,
  emailValueAtom,
  loginModalAtom,
  nicknameValueAtom,
  passwordValueAtom,
  phoneValueAtom,
} from '../../../recoil/atoms';
import styled from 'styled-components';
import NicknameInput from '../Input/NicknameInput';
import ColorButton from '../../shared/UI/ColorButton';
import PhoneInput from '../Input/PhoneInput';
import useHttpRequest from '../../../hooks/useHttpRequest';
import { useSearchParams } from 'react-router-dom';
import { JOIN_API_PATH } from '../../../constants/api';

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
  const setIsLoginModalOpen = useSetRecoilState(loginModalAtom);

  const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
  const emailValue = useRecoilValue(emailValueAtom);
  const passwordValue = useRecoilValue(passwordValueAtom);
  const [nicknameValue, setNicknameValue] = useRecoilState(nicknameValueAtom);

  const [searchParams] = useSearchParams();

  const isValid = isNicknameValid && isPhoneValid;

  const getNicknameValid = (valid: boolean) => {
    setIsNicknameValid(valid);
  };

  const getPhoneValid = (valid: boolean) => {
    setIsPhoneValid(valid);
  };

  const handleSubmitUserInfo = async () => {
    try {
      await sendRequest({
        url: `${JOIN_API_PATH}`,
        body: { email: emailValue, password: passwordValue, nickname: nicknameValue, phoneNumber: phoneValue },
        method: 'POST',
      });
    } catch (error) {
      console.error(error);
    }
  };
  const initialState = () => {
    setNicknameValue('');
    setPhoneValue('');
  };

  useEffect(() => {
    if (responseData?.isSuccess) {
      setIsAdditionalInfoModalOpen(false);
      setIsLoginModalOpen(true);
      initialState();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    const isAdditionalTrue = searchParams.get('additional_info');

    if (isAdditionalTrue === 'false') {
      setIsAdditionalInfoModalOpen(true);
    }
  }, [searchParams, setIsAdditionalInfoModalOpen]);
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
