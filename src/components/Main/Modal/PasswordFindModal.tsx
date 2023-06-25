import styled from 'styled-components';
import Modal from '../../shared/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { passwordFindModalAtom, passwordValueAtom } from '../../../recoil/atoms';
import { StyleBody } from './JoinModal';
import Input from '../../shared/UI/Input';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ColorButton from '../../shared/UI/ColorButton';
import Button from '../../shared/UI/Button';
import PasswordInput from '../Input/PasswordInput';
import ConfirmPasswordInput from '../Input/ConfirmPasswordInput';
import useHttpRequest from '../../../hooks/useHttpRequest';
import { RESET_PASSWORD_API_PATH } from '../../../constants/api';
import usePhoneCertification from '../../../hooks/usePhoneCertification';

export default function PasswordFindModal() {
  const [phoneValue, setPhoneValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const {
    codeNumberError,
    codeNumberErrorMessage,
    isPhoneOk,
    handleSubmitConfirmNumber,
    handleValidityPhone,
    phoneError,
    phoneErrorMessage,
    sendCodeNumberButtonText,
    initialState: hookStateInitial,
  } = usePhoneCertification({ phoneValue, codeValue });
  const { responseData: resetPWDResponseData, sendRequest: resetPWDSendRequest } = useHttpRequest();

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [isPasswordFindModalOpen, setIsPasswordFindModalOpen] = useRecoilState(passwordFindModalAtom);
  const passwordValue = useRecoilValue(passwordValueAtom);

  const isValid = isPasswordValid && isConfirmPasswordValid;

  const onPhoneValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneValue(value);
  }, []);

  const onCodeValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCodeValue(value);
  }, []);

  const handleGetPasswordValid = (valid: boolean) => {
    setIsPasswordValid(valid);
  };

  const handleGetConfirmPasswordValid = (valid: boolean) => {
    setIsConfirmPasswordValid(valid);
  };

  const handleSendConfrimNumber = () => {
    handleValidityPhone();
  };

  const handleClickConfirmButton = async () => {
    const isValueOk = handleSubmitConfirmNumber();
    if (!isValueOk) return;
    if (!isValid) return;

    await resetPWDSendRequest({
      url: RESET_PASSWORD_API_PATH,
      method: 'PATCH',
      body: { phoneNumber: phoneValue, password: passwordValue },
    });
  };

  const initialState = () => {
    setIsPasswordValid(false);
    setIsConfirmPasswordValid(false);
    setPhoneValue('');
    setCodeValue('');
    hookStateInitial();
  };

  useEffect(() => {
    if (!resetPWDResponseData) return;

    if (resetPWDResponseData.isSuccess) {
      setIsPasswordFindModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPWDResponseData]);

  const title = (
    <StyleTap>
      <div>비밀번호 찾기</div>
    </StyleTap>
  );
  const body = (
    <StylePasswordFindBody>
      <Input onChange={onPhoneValueChange} placeholder="휴대폰 번호" type="number" inputMode="tel" />
      {phoneError && <StyleError>{phoneErrorMessage}</StyleError>}
      <ColorButton label={sendCodeNumberButtonText} onClick={handleSendConfrimNumber} />

      {isPhoneOk && (
        <>
          <Input onChange={onCodeValueChange} placeholder="인증번호 입력" type="number" />
          {codeNumberError && <StyleError>{codeNumberErrorMessage}</StyleError>}
          <PasswordInput getValid={handleGetPasswordValid} />
          <ConfirmPasswordInput getValid={handleGetConfirmPasswordValid} />
          <Button label="확인" onClick={handleClickConfirmButton} />
        </>
      )}
    </StylePasswordFindBody>
  );
  return (
    <Modal
      title={title}
      label="비밀번호 찾기"
      body={body}
      isOpen={isPasswordFindModalOpen}
      onClose={() => {
        setIsPasswordFindModalOpen(false);
        initialState();
      }}
    />
  );
}

const StyleTap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StylePasswordFindBody = styled(StyleBody)``;

const StyleError = styled.span`
  margin-left: 0.5rem;
  margin-top: 1rem;
  color: red;
  font-size: 13px;
`;
