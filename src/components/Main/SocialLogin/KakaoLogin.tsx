import { ImBubble } from 'react-icons/im';
import SocialButton from '../Modal/Button/SocialButton';
import useSocialLogin from '../../../hooks/useSocialLogin';

export default function KakaoLogin() {
  const { login } = useSocialLogin({ provider: 'kakao' });
  const kakaoLoginClickHandler = () => {
    login();
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
