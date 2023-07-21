import { ImBubble } from 'react-icons/im';
import SocialButton from '../../shared/Modal/Button/SocialButton';

export default function KakaoLogin() {
  const kakaoLoginClickHandler = () => {
    window.location.href = 'https://shimpyo-api.p-e.kr:8081/oauth2/authorization/kakao';
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
