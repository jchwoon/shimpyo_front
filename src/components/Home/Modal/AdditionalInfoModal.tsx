import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { useState } from 'react';
import { additionalInfoModalAtom, emailValueAtom, nicknameValueAtom, passwordValueAtom } from '../../../recoil/atom';
import styled from 'styled-components';
import NicknameInput from '../NicknameInput';
import ColorButton from '../../shared/UI/ColorButton';
import { signUpHttp } from '../../../api/user';

export default function AdditionalInfoModal() {
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useRecoilState(additionalInfoModalAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [emailValue, setEmailValue] = useRecoilState(emailValueAtom);
  const [passwordValue, setPasswordValue] = useRecoilState(passwordValueAtom);
  const [nicknameValue, setNicknameValue] = useRecoilState(nicknameValueAtom);

  const getNicknameValid = (valid: boolean) => {
    setIsNicknameValid(valid);
  };

  const handleIdentityCheckButtonClick = async () => {
    try {
      setIsLoading(true);
      const data = await signUpHttp({ email: emailValue, password: passwordValue, nickname: nicknameValue });

      if (data.isSuccess) {
        alert('홈페이지로 이동 또는 로그인 모달');
        setEmailValue('');
        setPasswordValue('');
        setNicknameValue('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const body = (
    <StyleBody>
      <NicknameInput getValid={getNicknameValid} />
      <ColorButton disabled={!isNicknameValid} label="본인인증 후 가입" onClick={handleIdentityCheckButtonClick} />
    </StyleBody>
  );
  return (
    <Modal title="추가적으로 정보를 입력해주세요." body={body} isOpen={isAdditionalInfoModalOpen} label="추가 정보" />
  );
}

const StyleBody = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;
