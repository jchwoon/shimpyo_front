import { useRecoilState, useSetRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import {
  additionalInfoModalAtom,
  confirmPasswordValueAtom,
  emailValueAtom,
  joinModalAtom,
  loginModalAtom,
  passwordValueAtom,
} from '../../../recoil/atoms';
import styled from 'styled-components';
import { useState } from 'react';
import ColorButton from '../../shared/UI/ColorButton';
import EmailInput from '../Input/EmailInput';
import PasswordInput from '../Input/PasswordInput';
import ConfirmPasswordInput from '../Input/ConfirmPasswordInput';
import GoogleSocialLogin from '../SocialLogin/GoogleSocialLogin';
import NaverLogin from '../SocialLogin/NaverLogin';
import KakaoLogin from '../SocialLogin/KakaoLogin';

export default function JoinModal() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const setIsLoginModalOpen = useSetRecoilState(loginModalAtom);
  const setIsAdditionalInfoModalOpen = useSetRecoilState(additionalInfoModalAtom);
  const [isJoinModalOpen, setIsJoinModalOpen] = useRecoilState(joinModalAtom);

  const setEmailValue = useSetRecoilState(emailValueAtom);
  const setPasswordValue = useSetRecoilState(passwordValueAtom);
  const setConfirmPasswordValue = useSetRecoilState(confirmPasswordValueAtom);

  const isValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;

  const handleNextButtonClick = () => {
    setIsJoinModalOpen(false);
    setIsAdditionalInfoModalOpen(true);
    setConfirmPasswordValue('');
  };

  const handleGetEmailValid = (valid: boolean) => {
    setIsEmailValid(valid);
  };

  const handleGetPasswordValid = (valid: boolean) => {
    setIsPasswordValid(valid);
  };

  const handleGetConfirmPasswordValid = (valid: boolean) => {
    setIsConfirmPasswordValid(valid);
  };

  const initialState = () => {
    setEmailValue('');
    setPasswordValue('');
    setConfirmPasswordValue('');
  };

  const title = (
    <div>
      <img width={50} height={20} alt="logo" src="images/logo.png" />
      <span>에 오신것을 환영합니다.</span>
    </div>
  );

  const body = (
    <>
      <StyleBody>
        <EmailInput getValid={handleGetEmailValid} />
        <PasswordInput getValid={handleGetPasswordValid} />
        <ConfirmPasswordInput getValid={handleGetConfirmPasswordValid} />
        <ColorButton onClick={handleNextButtonClick} disabled={!isValid} label="계속" />
      </StyleBody>
      <hr />
    </>
  );

  const footer = (
    <StyleFooter>
      <KakaoLogin />
      <NaverLogin />
      <GoogleSocialLogin />
      <StyleSwitchToLoginButton
        onClick={() => {
          setIsJoinModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      >
        이미 계정이 있으신가요? &rarr;
      </StyleSwitchToLoginButton>
    </StyleFooter>
  );
  return (
    <Modal
      onClose={() => {
        setIsJoinModalOpen(false);
        initialState();
      }}
      isOpen={isJoinModalOpen}
      label="회원가입"
      title={title}
      body={body}
      footer={footer}
    />
  );
}

export const StyleBody = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const StyleFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyleSwitchToLoginButton = styled.span`
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
