import { ImBubble } from 'react-icons/im';
import SocialButton from '../Modal/Button/SocialButton';

export default function KakaoLogin() {
  const REST_API_KEY = '322b8813c5992474c88a98dfb3285c92';
  const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';

  const kakoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const kakaoLoginClickHandler = () => {
    window.location.href = 'http://shimpyo-api.p-e.kr:8081/oauth2/authorization/kakao';
  };
  return (
    <SocialButton
      onClick={kakaoLoginClickHandler}
      iconColor="#000000"
      containerColor="#FEE500"
      icon={ImBubble}
      label="카카오 로그인"
    />
  );
}
