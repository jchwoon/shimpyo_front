import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import AccountInfoList from '../ReUse/AccountInfoList';
import PasswordInput from '../../Main/Input/PasswordInput';
import ConfirmPasswordInput from '../../Main/Input/ConfirmPasswordInput';
import BlackButton from '../ReUse/UI/BlackButton';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import styled from 'styled-components';
import Input from '../../shared/UI/Input';
import { useRecoilValue } from 'recoil';
import { passwordValueAtom } from '../../../recoil/userAtoms';
import { USER_PASSWORD_API_PATH } from '../../../constants/api/userApi';

export default function ChangePasswordInfo() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { isLoading, responseData, sendRequest } = useAuthorizedRequest({});
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const modifiedPasswordValue = useRecoilValue(passwordValueAtom);

  const onChangeCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const getPasswordValid = (valid: boolean) => {
    setIsValidPassword(valid);
  };

  const getConfirmPasswordValid = (valid: boolean) => {
    setIsValidConfirmPassword(valid);
  };

  const submitModifiedNickname = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPassword || !isValidConfirmPassword || !isValidPassword) {
      setErrorMessage('비밀번호가 유효한지 확인해 주세요');
      return;
    }
    if (currentPassword === modifiedPasswordValue) {
      setErrorMessage('새로운 비밀번호는 이전의 비밀번호와 같을 수 없습니다.');
      return;
    }

    await sendRequest({
      url: `${USER_PASSWORD_API_PATH}`,
      method: 'PATCH',
      body: { currentPassword: currentPassword, modifiedPassword: modifiedPasswordValue },
    });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setIsEditMode(false);
    }
  }, [responseData]);

  const editComponent = (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitModifiedNickname(e)} name="nickname">
      <StyleNicknameInputBox>
        <Input onChange={onChangeCurrentPassword} placeholder="현재 비밀번호" type="password" />
        <span style={{ marginTop: '20px' }}>재설정할 비밀번호를 입력해 주세요</span>
        <PasswordInput getValid={getPasswordValid} />
        <ConfirmPasswordInput getValid={getConfirmPasswordValid} />
        {errorMessage && <StyleError>{errorMessage}</StyleError>}
      </StyleNicknameInputBox>
      <div style={{ marginBottom: '24px' }}>
        <BlackButton disabled={isLoading} buttonType="submit" label="비밀번호 변경" />
      </div>
    </form>
  );
  return (
    <AccountInfoList
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      title="비밀번호"
      editComponent={editComponent}
      infoContent="비밀번호 업데이트"
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
