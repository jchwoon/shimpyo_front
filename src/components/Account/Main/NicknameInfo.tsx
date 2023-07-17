import styled from 'styled-components';
import AccountInfoList, { AccountInfoListProps } from '../ReUse/AccountInfoList';
import NicknameInput from '../../Main/Input/NicknameInput';
import { FormEvent, useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useRecoilValue } from 'recoil';
import { nicknameValueAtom } from '../../../recoil/userAtoms';
import BlackButton from '../ReUse/UI/BlackButton';
import { USER_NICKNAME_API_PATH } from '../../../constants/api/userApi';

interface NicknameInfoProps extends Pick<AccountInfoListProps, 'infoContent'> {
  fetchUserInfo: () => void;
}

export default function NicknameInfo({ infoContent, fetchUserInfo }: NicknameInfoProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentNickname, setCurrentNickname] = useState(infoContent);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
  const { responseData, sendRequest, isLoading } = useAuthorizedRequest({});
  const modifiedNickname = useRecoilValue(nicknameValueAtom);

  const getNicknameValid = (valid: boolean) => {
    setIsNicknameValid(valid);
  };

  const submitModifiedNickname = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNicknameValid) return;
    if (currentNickname === modifiedNickname) return;

    await sendRequest({ url: `${USER_NICKNAME_API_PATH}`, method: 'PATCH', body: { nickname: modifiedNickname } });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setCurrentNickname(modifiedNickname);
      setIsEditMode(false);
      fetchUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const editComponent = (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitModifiedNickname(e)} name="nickname">
      <StyleNicknameInputBox>
        <NicknameInput getValid={getNicknameValid} />
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
      editComponent={editComponent}
      title="닉네임"
      infoContent={infoContent}
    />
  );
}

const StyleNicknameInputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;
