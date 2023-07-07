import { useEffect, useState } from 'react';
import useHttpRequest from './useHttpRequest';
import { phoneRule } from '../utils/validation';
import { PHONE_AUTHENTICATION_API_PATH, PHONE_AUTHENTICATION_ONLY_USER_API_PATH } from '../constants/api/userApi';

interface IResultData {
  codeNumber: string;
}

interface usePhoneCertificationProps {
  phoneValue: string | undefined;
  codeValue: string | undefined;
  isUser: boolean;
}

//휴대폰 인증 요청
export default function usePhoneCertification({ phoneValue, codeValue, isUser }: usePhoneCertificationProps) {
  const { responseData, isLoading, sendRequest } = useHttpRequest<IResultData>();

  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');

  const [codeNumberError, setCodeNumberError] = useState(false);
  const [codeNumberErrorMessage, setCodeNumberErrorMessage] = useState('');

  const [isPhoneOk, setIsPhoneOk] = useState(false);
  const [sendCodeNumberButtonText, setSendCodeNumberButtonText] = useState('인증번호 발송');

  const [receiveNumber, setRecieveNumber] = useState<string>('');

  const handleSubmitConfirmNumber = () => {
    if (!codeValue) return false;
    if (!receiveNumber) return false;

    if (receiveNumber === codeValue) {
      setCodeNumberError(false);
      setCodeNumberErrorMessage('');
      return true;
    } else {
      setCodeNumberError(true);
      setCodeNumberErrorMessage('인증번호를 다시 한번 확인해주세요.');
      return false;
    }
  };

  const handleValidityPhone = async () => {
    if (phoneValue === undefined || !phoneRule.test(phoneValue)) {
      setPhoneError(true);
      setPhoneErrorMessage('휴대폰 번호를 올바르게 입력했는지 확인해주세요.');
      return;
    }
    await sendRequest({
      url: `${isUser ? PHONE_AUTHENTICATION_ONLY_USER_API_PATH : PHONE_AUTHENTICATION_API_PATH}`,
      body: { phoneNumber: phoneValue },
      method: 'POST',
      withcredential: true,
    });
  };

  const initialState = () => {
    setPhoneError(false);
    setPhoneErrorMessage('');
    setCodeNumberError(false);
    setCodeNumberErrorMessage('');
    setIsPhoneOk(false);
    setSendCodeNumberButtonText('인증번호 발송');
    setRecieveNumber('');
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData?.isSuccess) {
      setPhoneError(false);
      setRecieveNumber(responseData.result.codeNumber);
      setIsPhoneOk(true);
      setSendCodeNumberButtonText('인증번호 재발송');
    } else {
      setPhoneError(true);
      setPhoneErrorMessage(responseData.message);
    }
  }, [responseData]);
  return {
    isLoading,
    phoneError,
    phoneErrorMessage,
    codeNumberError,
    codeNumberErrorMessage,
    isPhoneOk,
    sendCodeNumberButtonText,
    handleSubmitConfirmNumber,
    handleValidityPhone,
    initialState,
  };
}
