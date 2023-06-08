import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import { emailValidation } from '../../utils/validation';
import Input from '../shared/UI/Input';
import { useRecoilState } from 'recoil';
import { emailValueAtom } from '../../recoil/atom';
import { checkEmailHttp } from '../../api/user';

interface EmailInputProps {
  getValid: (valid: boolean) => void;
}

export default function EmailInput({ getValid }: EmailInputProps) {
  const [emailValue, setEmailValue] = useRecoilState(emailValueAtom);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isEmailOverlap, setIsEmailOverlap] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validationCheck = emailValidation.test(emailValue);

  const returnValidity = useCallback(() => {
    getValid(isValid);
  }, [isValid, getValid]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmailValue(value);
  };

  useEffect(() => {
    const validateEmail = () => {
      if (emailValue && !validationCheck) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소가 올바르지 않습니다.');
      } else if (emailValue && isEmailOverlap) {
        setEmailError(true);
        setEmailErrorMessage('이미 가입된 이메일 주소입니다.');
      } else {
        setEmailError(false);
        setEmailErrorMessage('');
      }
    };

    setIsValid(emailValue !== '' && validationCheck && !isEmailOverlap);

    validateEmail();
    returnValidity();
  }, [returnValidity, validationCheck, emailValue, isEmailOverlap]);

  // useEffect(() => {
  //   const handleCheckEmail = async () => {
  //     if (emailValue && validationCheck) {
  //       try {
  //         const data = await checkEmailHttp(emailValue);

  //         setIsEmailOverlap(data.isSuccess);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   const overlapTest = setTimeout(() => {
  //     handleCheckEmail();
  //   }, 1000);

  //   return () => clearInterval(overlapTest);
  // }, [emailValue, validationCheck]);
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
