import SocialButton from '../Modal/Button/SocialButton';
import { SiNaver } from 'react-icons/si';

export default function NaverLogin() {
  const naverButtonClickHandler = () => {
    window.location.href = 'http://shimpyo-api.p-e.kr:8081/oauth2/authorization/naver';
  };
  return (
    <>
      {/* <div ref={naverRef} style={{ display: 'none' }} id="naverIdLogin"></div> */}
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
