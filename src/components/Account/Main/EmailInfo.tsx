import styled from 'styled-components';
import AccountInfoList, { AccountInfoListProps } from '../ReUse/AccountInfoList';
import BlackButton from '../ReUse/UI/BlackButton';
import { FormEvent, useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import EmailInput from '../../Main/Input/EmailInput';
import { useRecoilValue } from 'recoil';
import { emailValueAtom } from '../../../recoil/userAtoms';
import { USER_EMAIL_API_PATH } from '../../../constants/api/userApi';

interface EmailInfoProps extends Pick<AccountInfoListProps, 'infoContent'> {}

export default function EmailInfo({ infoContent }: EmailInfoProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState(infoContent);
  const { responseData, sendRequest, isLoading } = useAuthorizedRequest({});
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const modifiedEmail = useRecoilValue(emailValueAtom);

  const getEmailValid = (valid: boolean) => {
    setIsEmailValid(valid);
  };

  const submitModifiedNickname = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid) return;
    if (modifiedEmail === currentEmail) return;

    await sendRequest({ url: `${USER_EMAIL_API_PATH}`, method: 'PATCH', body: { email: modifiedEmail } });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setCurrentEmail(modifiedEmail);
      setIsEditMode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const editComponent = (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitModifiedNickname(e)} name="nickname">
      <StyleNicknameInputBox>
        <EmailInput getValid={getEmailValid} />
      </StyleNicknameInputBox>
      <div style={{ marginBottom: '24px' }}>
        <BlackButton disabled={isLoading} buttonType="submit" label="저장" />
      </div>
    </form>
  );
  return (
    <AccountInfoList
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      title="이메일 주소"
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
