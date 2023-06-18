import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Input from '../../shared/UI/Input';
import { useRecoilState, useRecoilValue } from 'recoil';
import { passwordSelector } from '../../../recoil/selector';
import { confirmPasswordValueAtom } from '../../../recoil/atoms';

interface ConfirmPasswordInputProps {
  getValid: (valid: boolean, value: string) => void;
}

export default function ConfirmPasswordInput({ getValid }: ConfirmPasswordInputProps) {
  const passwordValue = useRecoilValue(passwordSelector);
  const [confirmPasswordValue, setConfirmPasswordValue] = useRecoilState(confirmPasswordValueAtom);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validationCheck = passwordValue === confirmPasswordValue;

  const returnValidity = useCallback(() => {
    getValid(isValid, confirmPasswordValue);
  }, [isValid, getValid, confirmPasswordValue]);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPasswordValue(value);
  };

  useEffect(() => {
    const validateConfirmPassword = () => {
      if (confirmPasswordValue !== '' && !validationCheck) {
        setConfirmPasswordError(true);
        setConfirmPasswordErrorMessage('비밀번호가 올바르지 않습니다.');
      } else {
        setConfirmPasswordError(false);
        setConfirmPasswordErrorMessage('');
      }
    };

    setIsValid(validationCheck);

    validateConfirmPassword();
    returnValidity();
  }, [returnValidity, confirmPasswordValue, passwordValue, validationCheck]);
  return (
    <Input
      value={confirmPasswordValue}
      error={confirmPasswordError}
      errorMessage={confirmPasswordErrorMessage}
      onChange={handleConfirmPasswordChange}
      placeholder="비밀번호 확인"
      type="password"
    />
  );
}
