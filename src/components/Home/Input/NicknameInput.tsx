import { useRecoilState } from 'recoil';
import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import Input from '../../shared/UI/Input';
import { nicknameValueAtom } from '../../../recoil/atom';
import { nicknameRule } from '../../../utils/validation';
import useHttpRequest from '../../../hooks/useHttpRequest';

interface nickNameInputProps {
  getValid: (valid: boolean) => void;
}

export default function NicknameInput({ getValid }: nickNameInputProps) {
  const { error, responseData, sendRequest } = useHttpRequest();

  const [nicknameValue, setNicknameValue] = useRecoilState(nicknameValueAtom);
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

  const isValid = nicknameValue !== '' && nicknameError;
  const validationCheck = nicknameRule.test(nicknameValue);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNicknameValue(value);
  };

  const handleCheckNickname = async () => {
    if (nicknameValue && validationCheck) {
      await sendRequest({ url: `/api/check-nickname?nickname=${nicknameValue}`, method: 'POST' });
    }
  };

  const handleValidityNickname = useCallback(() => {
    if (!validationCheck) {
      setNicknameError(true);
      setNicknameErrorMessage('닉네임이 올바르지 않습니다.');
    } else if (error) {
      setNicknameError(true);
      setNicknameErrorMessage('요청을 처리하는 동안 문제가 발생했습니다.');
    } else if (responseData && !responseData.isSuccess) {
      setNicknameError(true);
      setNicknameErrorMessage('이미 존재하는 닉네임 입니다.');
    } else {
      setNicknameError(false);
      setNicknameErrorMessage('');
    }
  }, [error, responseData, validationCheck]);

  useEffect(() => {
    const overlapTest = setTimeout(() => {
      handleCheckNickname();
    }, 700);

    return () => clearInterval(overlapTest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nicknameValue, validationCheck]);

  useEffect(() => {
    if (!nicknameValue) {
      setNicknameErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    getValid(isValid);
    handleValidityNickname();
  }, [getValid, handleValidityNickname, isValid, nicknameValue]);
  return (
    <Input
      value={nicknameValue}
      error={nicknameError}
      errorMessage={nicknameErrorMessage}
      onChange={handleNicknameChange}
      placeholder="닉네임"
      type="text"
    />
  );
}
