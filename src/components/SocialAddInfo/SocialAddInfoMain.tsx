import styled from 'styled-components';
import Modal from '../shared/Modal';
import NicknameInput from '../Main/Input/NicknameInput';
import PhoneInput from '../Main/Input/PhoneInput';
import ColorButton from '../shared/UI/ColorButton';
import useHttpRequest from '../../hooks/useHttpRequest';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SOCIAL_ADDITIONAL_INFO_API_PATH } from '../../constants/api/userApi';
import Button from '../shared/UI/Button';
import { accessTokenAtom, nicknameValueAtom, phoneValueAtom } from '../../recoil/User/userAtoms';

interface IResultData {
  accessToken: string;
}

export default function SocialAddInfoMain() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const { isLoading, responseData, sendRequest } = useHttpRequest<IResultData>();
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const [nicknameValue, setNicknameValue] = useRecoilState(nicknameValueAtom);
  const [phoneValue, setPhoneValue] = useRecoilState(phoneValueAtom);
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const isValid = isNicknameValid && isPhoneValid;

  const getNicknameValid = (valid: boolean) => {
    setIsNicknameValid(valid);
  };

  const getPhoneValid = (valid: boolean) => {
    setIsPhoneValid(valid);
  };

  const handleSubmitUserInfo = async () => {
    const userId = searchParams.get('user_id');
    await sendRequest({
      url: `${SOCIAL_ADDITIONAL_INFO_API_PATH}`,
      body: { id: userId, nickname: nicknameValue, phoneNumber: phoneValue },
      method: 'POST',
    });
  };

  const initialState = () => {
    setNicknameValue('');
    setPhoneValue('');
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      initialState();
      setAccessToken(responseData.result.accessToken);
      window.location.href = '/';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const body = (
    <StyleBody>
      <NicknameInput getValid={getNicknameValid} />
      <PhoneInput getValid={getPhoneValid} />
      <StyleButtonBlock>
        <Button label="홈으로" onClick={() => navigation('/')} />
        <ColorButton disabled={!isValid || isLoading} label="가입" onClick={handleSubmitUserInfo} />
      </StyleButtonBlock>
    </StyleBody>
  );
  return <Modal label={`소셜 추가 정보`} title="추가 정보를 입력해주세요" body={body} isOpen={true} />;
}

const StyleBody = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const StyleButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
