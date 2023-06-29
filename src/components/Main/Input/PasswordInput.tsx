import { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { passwordRule, secondPasswordRule } from '../../../utils/validation';
import Input from '../../shared/UI/Input';
import { useRecoilState } from 'recoil';
import { passwordValueAtom } from '../../../recoil/userAtoms';

interface PasswordInputProps {
  getValid: (valid: boolean) => void;
}

export default function PasswordInput({ getValid }: PasswordInputProps) {
  const [passwordValue, setPasswordValue] = useRecoilState(passwordValueAtom);
  const [passwordError, setPasswordError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const firstRule = passwordRule.test(passwordValue);
  const secondRule = !secondPasswordRule.test(passwordValue);

  const returnValidity = useCallback(() => {
    getValid(isValid);
  }, [isValid, getValid]);

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPasswordValue(value);
    },
    [setPasswordValue],
  );

  useEffect(() => {
    const validatePassword = () => {
      if (passwordValue !== '' && !firstRule) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    };

    setIsValid(firstRule && secondRule);

    returnValidity();
    validatePassword();
  }, [passwordValue, firstRule, secondRule, returnValidity]);

  const passwordErrorMessage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {<span style={{ color: `${firstRule ? '#00891a' : 'red'}` }}>영문/숫자/특수문자 1가지 이상 조합 (8~20자)</span>}
      {<span style={{ color: `${secondRule ? '#00891a' : 'red'}` }}>3개 이상 연속되거나 동일한 문자/숫자 제외</span>}
    </div>
  );
  return (
    <Input
      value={passwordValue}
      error={passwordError}
      errorMessage={passwordErrorMessage}
      onChange={handlePasswordChange}
      placeholder="비밀번호"
      type="password"
    />
  );
}
