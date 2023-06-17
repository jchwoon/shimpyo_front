import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import { emailValidation } from '../../../utils/validation';
import Input from '../../shared/UI/Input';
import { useRecoilState } from 'recoil';
import { emailValueAtom } from '../../../recoil/atom';
import useHttpRequest from '../../../hooks/useHttpRequest';

interface EmailInputProps {
  getValid: (valid: boolean) => void;
}

export default function EmailInput({ getValid }: EmailInputProps) {
  const { errorMessage, responseData, sendRequest } = useHttpRequest();

  const [emailValue, setEmailValue] = useRecoilState(emailValueAtom);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const validationCheck = emailValidation.test(emailValue);
  const isValid = emailValue !== '' && !emailError;

  const validateEmail = useCallback(() => {
    if (!validationCheck) {
      setEmailError(true);
      setEmailErrorMessage('이메일 주소가 올바르지 않습니다.');
    } else if (errorMessage) {
      setEmailError(true);
      setEmailErrorMessage(errorMessage);
    } else if (responseData && !responseData.isSuccess) {
      setEmailError(true);
      setEmailErrorMessage('이미 가입된 이메일 주소입니다.');
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
  }, [validationCheck, errorMessage, responseData]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmailValue(value);
  };

  const handleCheckEmail = async () => {
    if (emailValue && validationCheck) {
      await sendRequest({ url: `/public/check-email`, method: 'POST', body: { email: emailValue } });
    }
  };

  useEffect(() => {
    const overlapTest = setTimeout(() => {
      handleCheckEmail();
    }, 700);

    return () => clearTimeout(overlapTest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValue, validationCheck]);

  useEffect(() => {
    if (!emailValue) {
      setEmailErrorMessage('이메일을 입력해주세요');
      return;
    }

    validateEmail();
    getValid(isValid);
  }, [emailValue, validateEmail, getValid, isValid]);
  return (
    <Input
      value={emailValue}
      error={emailError}
      errorMessage={emailErrorMessage}
      onChange={handleEmailChange}
      placeholder="이메일"
      type="email"
    />
  );
}
