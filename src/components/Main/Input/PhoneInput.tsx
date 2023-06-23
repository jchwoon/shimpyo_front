import { useRecoilState } from 'recoil';
import Input from '../../shared/UI/Input';
import { ChangeEvent, useState, useCallback, useRef, useEffect } from 'react';
import { phoneValueAtom } from '../../../recoil/atoms';
import styled from 'styled-components';
import ColorButton from '../../shared/UI/ColorButton';
import { phoneRule } from '../../../utils/validation';
import { StyleNumberTypeInput } from '../../style/shareStyle';
import Button from '../../shared/UI/Button';
import useHttpRequest from '../../../hooks/useHttpRequest';
import { PHONE_AUTHENTICATION_API_PATH, PHONE_OVERLAP_CHECK_API_PATH } from '../../../constants/api';

interface PhoneInputProps {
  getValid: (valid: boolean) => void;
}

interface IResultData {
  codeNumber: string;
}

export default function PhoneInput({ getValid }: PhoneInputProps) {
  const { errorMessage, responseData, sendRequest } = useHttpRequest();
  const {
    responseData: toUserNumberResponseData,
    isLoading: toUserNumberIsLoading,
    sendRequest: toUserNumberSendRequest,
  } = useHttpRequest<IResultData>();

  const confirmNumberInputRef = useRef<HTMLInputElement>(null);
  const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
  //인풋에 대한 에러
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  //인증번호 확인에 대한 에러
  const [confirmNumberError, setConfirmNumberError] = useState(false);
  const [confirmNumberErrorMessage, setConfirmNumberErrorMessage] = useState('');

  const [confirmButton, setConfirmButton] = useState(false);
  const [confirmNumberButtonText, setConfirmNumberButtonText] = useState('인증번호 발송');

  const [receiveNumber, setRecieveNumber] = useState<string>();

  const [confirmNumberInputIsValid, setConfirmNumberInputIsValid] = useState(false);
  const phoneInputIsValid = phoneValue !== '' && !phoneError;
  const isValid = phoneValue !== '' && !phoneError && confirmNumberInputIsValid;
  const validationCheck = phoneRule.test(phoneValue);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneValue(value);
  };

  //폰 중복검사
  const handleCheckPhone = async () => {
    if (phoneValue && validationCheck) {
      await sendRequest({ url: `${PHONE_OVERLAP_CHECK_API_PATH}`, method: 'POST', body: { phoneNumber: phoneValue } });
    }
  };

  //인증본호 발송 api
  const handleSendConfirmNumber = async () => {
    if (!phoneInputIsValid) {
      return;
    }

    await toUserNumberSendRequest({
      url: `${PHONE_AUTHENTICATION_API_PATH}`,
      body: { phoneNumber: phoneValue },
      method: 'POST',
    });
    setConfirmNumberButtonText('인증번호 재발송');
  };

  //인증본호 확인 api
  const handleSubmitConfirmNumber = async () => {
    const value = confirmNumberInputRef.current?.value;
    if (!value) return;
    if (!receiveNumber) return;

    if (receiveNumber === value) {
      setConfirmNumberError(false);
      setConfirmNumberInputIsValid(true);
    } else {
      setConfirmNumberError(true);
      setConfirmNumberErrorMessage('인증번호를 다시 한번 확인해주세요.');
    }
  };

  const handleValidityPhone = useCallback(() => {
    if (!validationCheck) {
      setPhoneError(true);
      setPhoneErrorMessage('휴대폰 형식이 올바르지 않습니다.');
    } else if (errorMessage) {
      setPhoneError(true);
      setPhoneErrorMessage('요청을 처리하는 동안 문제가 발생했습니다.');
    } else if (responseData && !responseData.isSuccess) {
      setPhoneError(true);
      setPhoneErrorMessage('이미 등록된 휴대폰입니다.');
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }
  }, [errorMessage, responseData, validationCheck]);

  //휴대폰 중복 검사
  useEffect(() => {
    const overlapTest = setTimeout(() => {
      handleCheckPhone();
    }, 700);

    return () => clearInterval(overlapTest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneValue, validationCheck]);

  //휴대폰 유효성 검사
  useEffect(() => {
    if (!phoneValue) {
      setPhoneErrorMessage('휴대폰 번호를 입력해주세요.');
      return;
    }

    getValid(isValid);
    handleValidityPhone();
  }, [getValid, handleValidityPhone, isValid, phoneValue]);

  //인증번호 발송 후 처리
  useEffect(() => {
    if (!toUserNumberResponseData) return;

    if (toUserNumberResponseData?.isSuccess) {
      setRecieveNumber(toUserNumberResponseData.result.codeNumber);
      setConfirmButton(true);
    }
  }, [toUserNumberResponseData]);
  return (
    <>
      <Input
        value={phoneValue}
        error={phoneError}
        errorMessage={phoneErrorMessage}
        onChange={handlePhoneChange}
        placeholder="휴대폰 번호"
        inputMode="tel"
        type="number"
      />
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
              ref={confirmNumberInputRef}
              placeholder="입력"
              disabled={!confirmButton}
            />
            {confirmNumberError && <StyleErrorMessage>{confirmNumberErrorMessage}</StyleErrorMessage>}
          </label>

          <div style={{ width: '100px' }}>
            <ColorButton
              small
              disabled={!phoneInputIsValid || toUserNumberIsLoading}
              onClick={handleSendConfirmNumber}
              label={confirmNumberButtonText}
            />
            <Button disabled={!confirmButton} small label="확인" onClick={handleSubmitConfirmNumber} />
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

const StyleErrorMessage = styled.span`
  position: absolute;
  bottom: -20px;
  color: red;
  font-weight: 200;
  font-size: 12px;
`;
