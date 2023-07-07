import { useRecoilState, useSetRecoilState } from 'recoil';
import Modal from '../Modal';
import { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { idFindModalAtom, joinModalAtom, loginModalAtom, passwordFindModalAtom } from '../../../recoil/modalAtoms';
import { loginStateAtom, accessTokenAtom } from '../../../recoil/userAtoms';
import styled from 'styled-components';
import { StyleBody, StyleFooter, StyleSwitchToLoginButton } from './JoinModal';
import ColorButton from '../UI/ColorButton';
import useHttpRequest from '../../../hooks/useHttpRequest';
import Input from '../UI/Input';

import { LOGIN_API_PATH } from '../../../constants/api/userApi';
import KakaoLogin from '../../Main/SocialLogin/KakaoLogin';
import NaverLogin from '../../Main/SocialLogin/NaverLogin';
import GoogleSocialLogin from '../../Main/SocialLogin/GoogleSocialLogin';
import { useLocation, useNavigate } from 'react-router-dom';

interface ResultData {
  accessToken: string;
}

export default function LoginModal() {
  const { isLoading, responseData, sendRequest } = useHttpRequest<ResultData>();
  const location = useLocation();
  const navigation = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoginError, setIsLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const setIsLoggedIn = useSetRecoilState(loginStateAtom);
  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(loginModalAtom);
  const setIsIdFindModalOpen = useSetRecoilState(idFindModalAtom);
  const setIsPasswordFindModalOpen = useSetRecoilState(passwordFindModalAtom);
  const setIsJoinModalOpen = useSetRecoilState(joinModalAtom);
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const handleLoginButtonClick = async () => {
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    await sendRequest({
      url: `${LOGIN_API_PATH}`,
      body: { username: emailValue, password: passwordValue },
      method: 'POST',
      withcredential: true,
    });
  };

  const submitHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;

    handleLoginButtonClick();
  };

  const initialState = () => {
    setIsLoginError(false);
    setLoginErrorMessage('');
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData?.isSuccess) {
      setAccessToken(responseData.result.accessToken);
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      window.history.replaceState(null, '', '/');
      navigation(location?.state?.redirectedFrom?.pathname || '/');
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
      <StyleLoginBody onKeyUp={submitHandler}>
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
      <KakaoLogin />
      <NaverLogin />
      <GoogleSocialLogin />
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
    <>
      <Modal
        footer={footer}
        label="로그인"
        onClose={() => {
          setIsLoginModalOpen(false);
          initialState();
        }}
        title={title}
        body={body}
        isOpen={isLoginModalOpen}
      />
    </>
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