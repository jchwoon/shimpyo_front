import { useEffect, useRef } from 'react';
import SocialButton from '../Modal/SocialButton';
import { SiNaver } from 'react-icons/si';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { additionalInfoModalAtom, emailValueAtom, profileImageAtom } from '../../../recoil/atoms';

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

export default function NaverLogin() {
  const naverRef = useRef<HTMLDivElement>(null);

  const setAdditionalModal = useSetRecoilState(additionalInfoModalAtom);
  const setEmailValue = useSetRecoilState(emailValueAtom);
  const setProfileImageValue = useSetRecoilState(profileImageAtom);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '6C5dKEaDSVEiFaEzmkUO',
      callbackUrl: 'http://localhost:3000',
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 3,
        height: 60,
      },
    });
    naverLogin.init();
  };

  const naverLoginHandler = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '6C5dKEaDSVEiFaEzmkUO',
      callbackUrl: 'http://localhost:3000',
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 3,
        height: 60,
      },
    });
    naverLogin.getLoginStatus(async function (status: boolean) {
      if (status) {
        setAdditionalModal(true);
        //에디셔널 모달 창 띄우고 정보 받는 다음에 유저 아이디와 프로파일 이미지 넘기기?
        const userEmail = naverLogin.user.getEmail();
        const profileImage = naverLogin.user.getProfileImage();

        //axios요청

        setEmailValue(userEmail);
        setProfileImageValue(profileImage);
        // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
        // setUserInfo(naverLogin.user)
      } else {
        naverLogin.reprompt();
      }
    });
  };

  const naverButtonClickHandler = () => {
    const naverButton = naverRef.current?.children[0] as HTMLButtonElement;
    naverButton.click();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);
  return (
    <>
      <div onClick={naverLoginHandler} ref={naverRef} style={{ display: 'none' }} id="naverIdLogin"></div>
      <SocialButton
        onClick={naverButtonClickHandler}
        iconColor="#FFFFFF"
        containerColor="#17B75E"
        icon={SiNaver}
        label="네이버 로그인"
      />
    </>
  );
}
