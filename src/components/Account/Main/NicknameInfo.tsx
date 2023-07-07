import styled from 'styled-components';
import AccountInfoList, { AccountInfoListProps } from '../ReUse/AccountInfoList';
import NicknameInput from '../../Main/Input/NicknameInput';
import { FormEvent, useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useRecoilValue } from 'recoil';
import { nicknameValueAtom } from '../../../recoil/userAtoms';

interface NicknameInfoProps extends Pick<AccountInfoListProps, 'infoContent'> {}

export default function NicknameInfo({ infoContent }: NicknameInfoProps) {
  const [currentNickname, setCurrentNickname] = useState(infoContent);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const modifiedNickname = useRecoilValue(nicknameValueAtom);

  const getNicknameValid = (valid: boolean) => {
    setIsNicknameValid(valid);
  };

  const submitModifiedNickname = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNicknameValid) return;

    await sendRequest({ url: '/user/modify-nickname', method: 'PATCH' });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setCurrentNickname(modifiedNickname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const editComponent = (
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitModifiedNickname(e)} name="nickname">
      <StyleNicknameInputBox>
        <NicknameInput getValid={getNicknameValid} />
      </StyleNicknameInputBox>
      <div style={{ marginBottom: '24px' }}>
        <StyleSubmitButton type="submit">저장</StyleSubmitButton>
      </div>
    </form>
  );
  return <AccountInfoList editComponent={editComponent} title="닉네임" infoContent={currentNickname} />;
}

const StyleNicknameInputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyleSubmitButton = styled.button`
  background-color: black;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 14px 24px;
  border-radius: 0.5rem;
`;
