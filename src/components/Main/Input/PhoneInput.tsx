import Input from '../../shared/UI/Input';
import { useState, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import ColorButton from '../../shared/UI/ColorButton';
import { StyleNumberTypeInput } from '../../style/shareStyle';
import Button from '../../shared/UI/Button';
import usePhoneCertification from '../../../hooks/usePhoneCertification';
import { useRecoilState } from 'recoil';
import { phoneValueAtom } from '../../../recoil/User/userAtoms';

interface PhoneInputProps {
  getValid: (valid: boolean) => void;
}

export default function PhoneInput({ getValid }: PhoneInputProps) {
  const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
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
    isLoading,
    initialState,
  } = usePhoneCertification({ codeValue, phoneValue, isUser: false });

  const onPhoneValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneValue(value);
    initialState();
    getValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCodeValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCodeValue(value);
  }, []);

  const handleSendCodeNumber = () => {
    handleValidityPhone();
  };

  const handleCheckCodeNumber = async () => {
    const isCodeOkay = handleSubmitConfirmNumber();
    getValid(isCodeOkay);
  };

  return (
    <>
      <Input onChange={onPhoneValueChange} placeholder="휴대폰 번호" inputMode="tel" type="number" />
      {phoneError && <StyleError>{phoneErrorMessage}</StyleError>}
      <div style={{ margin: '1rem 0' }}>
        <StylePhoneConfirmRequest>
          <label
            style={{
              position: 'relative',
              flexGrow: '1',
              flexShrink: '1',
              borderBottom: '1px solid black',
              margin: '0 1rem',
              height: '80px',
            }}
          >
            <StyleConfirmNumberInput
              type="number"
              onChange={onCodeValueChange}
              placeholder="입력"
              disabled={!isPhoneOk}
            />
            {codeNumberError && <StyleErrorMessage>{codeNumberErrorMessage}</StyleErrorMessage>}
          </label>

          <div style={{ width: '100px' }}>
            <ColorButton small disabled={isLoading} onClick={handleSendCodeNumber} label={sendCodeNumberButtonText} />
            <Button disabled={!isPhoneOk} small label="확인" onClick={handleCheckCodeNumber} />
          </div>
        </StylePhoneConfirmRequest>
      </div>
    </>
  );
}

const StylePhoneConfirmRequest = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyleConfirmNumberInput = styled(StyleNumberTypeInput)`
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 18px;
  padding-left: 0.5rem;
`;

const StyleErrorMessage = styled.div`
  position: absolute;
  bottom: -20px;
  color: red;
  font-weight: 200;
  font-size: 12px;
`;

const StyleError = styled.span`
  margin-left: 0.5rem;
  margin-top: 1rem;
  color: red;
  font-size: 13px;
`;
