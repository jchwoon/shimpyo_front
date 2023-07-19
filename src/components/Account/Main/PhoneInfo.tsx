import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import AccountInfoList, { AccountInfoListProps } from '../ReUse/AccountInfoList';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import styled from 'styled-components';
import BlackButton from '../ReUse/UI/BlackButton';
import Input from '../../shared/UI/Input';
import usePhoneCertification from '../../../hooks/usePhoneCertification';
import Button from '../../shared/UI/Button';
import { USER_PHONE_API_PATH } from '../../../constants/api/userApi';

interface PhoneInfoProps extends Pick<AccountInfoListProps, 'infoContent'> {
  fetchUserInfo: () => void;
}

export default function PhoneInfo({ infoContent, fetchUserInfo }: PhoneInfoProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentPhone, setCurrentPhone] = useState(infoContent);
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [codeValue, setCodeValue] = useState<string>('');
  const { responseData, sendRequest, isLoading: modifyLoading } = useAuthorizedRequest({});
  const {
    codeNumberError,
    codeNumberErrorMessage,
    handleSubmitConfirmNumber,
    handleValidityPhone,
    initialState,
    isLoading,
    isPhoneOk,
    phoneError,
    phoneErrorMessage,
    sendCodeNumberButtonText,
  } = usePhoneCertification({ phoneValue, codeValue, isUser: false });

  const onChangePhoneValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value);
  };

  const onChangeCodeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCodeValue(value);
  };

  const requestModifyPhoneNumber = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCodeOk = handleSubmitConfirmNumber();
    if (!isCodeOk) return;
    await sendRequest({ url: `${USER_PHONE_API_PATH}`, method: 'PATCH', body: { phoneNumber: phoneValue } });
  };

  const requestAuthenticationNumber = () => {
    if (currentPhone === phoneValue) return;
    handleValidityPhone();
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setCurrentPhone(phoneValue);
      initialState();
      setIsEditMode(false);
      fetchUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const editComponent = (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => requestModifyPhoneNumber(e)}>
      <StyleNicknameInputBox>
        <Input onChange={onChangePhoneValue} placeholder="전화번호" type="tel" />
        {phoneError && <StyleError>{phoneErrorMessage}</StyleError>}
      </StyleNicknameInputBox>
      <div style={{ marginBottom: '24px' }}>
        <BlackButton
          disabled={isLoading}
          buttonType="button"
          onClick={() => requestAuthenticationNumber()}
          label={sendCodeNumberButtonText}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {isPhoneOk && (
          <>
            <Input onChange={onChangeCodeValue} value={codeValue} placeholder="인증번호 입력" type="number" />
            {codeNumberError && <StyleError>{codeNumberErrorMessage}</StyleError>}
            <Button disabled={modifyLoading} label="확인" />
          </>
        )}
      </div>
    </form>
  );
  return (
    <AccountInfoList
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      title="전화번호"
      editComponent={editComponent}
      infoContent={infoContent}
    />
  );
}

const StyleNicknameInputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyleError = styled.span`
  margin-left: 0.5rem;
  margin-top: 1rem;
  color: red;
  font-size: 13px;
`;
