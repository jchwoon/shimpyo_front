import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { idFindModalAtom } from '../../../recoil/Modal/modalAtoms';
import styled from 'styled-components';
import Input from '../../shared/UI/Input';
import { StyleBody } from './JoinModal';
import Button from '../../shared/UI/Button';
import ColorButton from '../../shared/UI/ColorButton';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useHttpRequest from '../../../hooks/useHttpRequest';
import { FIND_EMAIL_API_PATH } from '../../../constants/api/userApi';
import usePhoneCertification from '../../../hooks/usePhoneCertification';

interface IEmailData {
  email: string;
}

export default function IdFindModal() {
  const [phoneValue, setPhoneValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const {
    codeNumberError,
    codeNumberErrorMessage,
    handleSubmitConfirmNumber,
    handleValidityPhone,
    isPhoneOk,
    phoneError,
    phoneErrorMessage,
    sendCodeNumberButtonText,
    initialState: hookStateInitial,
  } = usePhoneCertification({ phoneValue, codeValue, isUser: true });
  const { responseData: emailResponseData, sendRequest: emailSendRequest } = useHttpRequest<IEmailData>();

  const [isIdFindModalOpen, setIsIdFindModalOpen] = useRecoilState(idFindModalAtom);
  const [getEmailValue, setGetEmailValue] = useState('');
  const [isOkay, setIsOkay] = useState(false);

  const onPhoneValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneValue(value);
  }, []);

  const onCodeValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCodeValue(value);
  }, []);

  const handleSendConfrimNumber = async () => {
    handleValidityPhone();
  };

  const getEmailValueHandler = async () => {
    const isCodeOk = handleSubmitConfirmNumber();
    if (!isCodeOk) return;
    await emailSendRequest({ url: FIND_EMAIL_API_PATH, body: { phoneNumber: phoneValue } });
  };

  const initialState = () => {
    setPhoneValue('');
    setCodeValue('');
    hookStateInitial();
  };

  useEffect(() => {
    if (!emailResponseData) return;

    if (emailResponseData.isSuccess) {
      setGetEmailValue(emailResponseData.result.email);
      setIsOkay(true);
    }
  }, [emailResponseData]);
  const title = (
    <StyleTap>
      <div>아이디(이메일)찾기</div>
    </StyleTap>
  );
  const body = (
    <StyleIdFindBody>
      <Input onChange={onPhoneValueChange} value={phoneValue} placeholder="휴대폰 번호" inputMode="tel" type="number" />
      {phoneError && <StyleError>{phoneErrorMessage}</StyleError>}
      <ColorButton label={sendCodeNumberButtonText} onClick={handleSendConfrimNumber} />

      {isPhoneOk && (
        <>
          <Input onChange={onCodeValueChange} value={codeValue} placeholder="인증번호 입력" type="number" />
          {codeNumberError && <StyleError>{codeNumberErrorMessage}</StyleError>}
          <Button onClick={getEmailValueHandler} label="확인" />
        </>
      )}
      {isOkay && <span>{getEmailValue}</span>}
    </StyleIdFindBody>
  );
  return (
    <Modal
      title={title}
      label="아이디(이메일) 찾기"
      body={body}
      isOpen={isIdFindModalOpen}
      onClose={() => {
        setIsIdFindModalOpen(false);
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

const StyleIdFindBody = styled(StyleBody)``;

const StyleError = styled.span`
  margin-left: 0.5rem;
  margin-top: 1rem;
  color: red;
  font-size: 13px;
`;

// const StyleConfirmNumberBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   label {
//     flex-grow: 1;
//     flex-basis: 100%;
//   }
// `;
