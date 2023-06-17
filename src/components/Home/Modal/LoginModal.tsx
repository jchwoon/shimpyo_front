import { useRecoilState, useSetRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { useRef, useEffect, useState } from 'react';
import {
  accessTokenAtom,
  idFindModalAtom,
  joinModalAtom,
  loginModalAtom,
  passwordFindModalAtom,
} from '../../../recoil/atom';
import styled from 'styled-components';
import { StyleBody, StyleFooter, StyleSwitchToLoginButton } from './JoinModal';
import SocialButton from './SocialButton';
import { ImBubble } from 'react-icons/im';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import ColorButton from '../../shared/UI/ColorButton';
import useHttpRequest from '../../../hooks/useHttpRequest';
import Input from '../../shared/UI/Input';

interface ResultData {
  accessToken: string;
}

export default function LoginModal() {
  const { isLoading, responseData, sendRequest } = useHttpRequest<ResultData>();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoginError, setIsLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(loginModalAtom);
  const setIsIdFindModalOpen = useSetRecoilState(idFindModalAtom);
  const setIsPasswordFindModalOpen = useSetRecoilState(passwordFindModalAtom);
  const setIsJoinModalOpen = useSetRecoilState(joinModalAtom);
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const handleLoginButtonClick = async () => {
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    await sendRequest({
      url: '/public/login',
      body: { username: emailValue, password: passwordValue },
      method: 'POST',
    });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData?.isSuccess) {
      setAccessToken(responseData.result.accessToken);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    } else {
      setIsLoginError(true);
      setLoginErrorMessage('이메일과 비밀번호를 다시 한번 확인해주세요.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const title = (
    <div>
      <img width={50} height={20} alt="logo" src="images/logo.png" />
      <span>에 오신것을 환영합니다.</span>
    </div>
  );

  const body = (
    <>
      <StyleLoginBody>
        <Input ref={emailRef} placeholder="이메일" type="text" />
        <Input ref={passwordRef} placeholder="비밀번호" type="password" />
        {isLoginError && <StyleError>{loginErrorMessage}</StyleError>}
        <StyleAccountInfoFind>
          <span
            onClick={() => {
              setIsIdFindModalOpen(true);
              setIsLoginModalOpen(false);
            }}
          >
            아이디 찾기 &rarr;
          </span>{' '}
          /{' '}
          <span
            onClick={() => {
              setIsPasswordFindModalOpen(true);
              setIsLoginModalOpen(false);
            }}
          >
            비밀번호 찾기 &rarr;
          </span>
        </StyleAccountInfoFind>
        <ColorButton disabled={isLoading} onClick={handleLoginButtonClick} label="로그인" />
      </StyleLoginBody>
      <hr />
    </>
  );

  const footer = (
    <StyleLoginFooter>
      <SocialButton iconColor="#000000" containerColor="#FEE500" icon={ImBubble} label="카카오 로그인" />
      <SocialButton iconColor="#FFFFFF" containerColor="#17B75E" icon={SiNaver} label="네이버 로그인" />
      <SocialButton containerColor="#F4F4F4" icon={FcGoogle} label="구글 로그인" />
      <StyleSwitchToJoinButton
        onClick={() => {
          setIsLoginModalOpen(false);
          setIsJoinModalOpen(true);
        }}
      >
        계정이 없으신가요? &rarr;
      </StyleSwitchToJoinButton>
    </StyleLoginFooter>
  );
  return (
    <Modal
      footer={footer}
      label="로그인"
      onClose={() => setIsLoginModalOpen(false)}
      title={title}
      body={body}
      isOpen={isLoginModalOpen}
    />
  );
}
const StyleLoginBody = styled(StyleBody)``;

const StyleLoginFooter = styled(StyleFooter)``;

const StyleSwitchToJoinButton = styled(StyleSwitchToLoginButton)``;

const StyleAccountInfoFind = styled.div`
  margin-top: 1rem;
  text-align: end;
  font-size: 13px;
  span {
    cursor: pointer;
    &:hover {
      color: #009ca6;
    }
  }
`;

const StyleError = styled.span`
  margin-top: 1rem;
  font-size: 13px;
  color: red;
`;
