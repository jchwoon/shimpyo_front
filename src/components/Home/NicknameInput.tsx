import { useRecoilState } from 'recoil';
import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import Input from '../shared/UI/Input';
import { nicknameValueAtom } from '../../recoil/atom';
import { nicknameRule } from '../../utils/validation';
import { checkNicknameHttp } from '../../api/user';

interface nickNameInputProps {
  getValid: (valid: boolean) => void;
}

export default function NicknameInput({ getValid }: nickNameInputProps) {
  const [nicknameValue, setNicknameValue] = useRecoilState(nicknameValueAtom);
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [isNicknameOverlap, setIsNicknameOverlap] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validationCheck = nicknameRule.test(nicknameValue);

  const returnValidity = useCallback(() => {
    getValid(isValid);
  }, [isValid, getValid]);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNicknameValue(value);
  };

  useEffect(() => {
    const validatenickname = () => {
      if (nicknameValue && !validationCheck) {
        setNicknameError(true);
        setNicknameErrorMessage('닉네임이 올바르지 않습니다.');
      } else if (nicknameValue && isNicknameOverlap) {
        setNicknameError(true);
        setNicknameErrorMessage('이미 가입된 이메일 주소입니다.');
      } else {
        setNicknameError(false);
        setNicknameErrorMessage('');
      }
    };

    setIsValid(nicknameValue !== '' && validationCheck && !isNicknameOverlap);

    validatenickname();
    returnValidity();
  }, [returnValidity, validationCheck, nicknameValue, isNicknameOverlap]);

  // useEffect(() => {
  //   const handleCheckNickname = async () => {
  //     if (nicknameValue && validationCheck) {
  //       try {
  //         const data = await checkNicknameHttp(nicknameValue);

  //         setIsNicknameOverlap(data.isSuccess);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   const overlapTest = setTimeout(() => {
  //     handleCheckNickname();
  //   }, 1000);

  //   return () => clearInterval(overlapTest);
  // }, [nicknameValue, validationCheck]);
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
