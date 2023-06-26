import SocialButton from '../Modal/Button/SocialButton';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleSocialLogin() {
  const login = () => {
    window.location.href = 'http://shimpyo-api.p-e.kr:8081/oauth2/authorization/google';
  };

  return <SocialButton onClick={login} containerColor="#F4F4F4" icon={FcGoogle} label="구글 로그인" />;
}
