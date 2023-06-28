import SocialButton from '../Modal/Button/SocialButton';
import { FcGoogle } from 'react-icons/fc';
import useSocialLogin from '../../../hooks/useSocialLogin';

export default function GoogleSocialLogin() {
  const { login } = useSocialLogin({ provider: 'google' });

  return <SocialButton onClick={login} containerColor="#F4F4F4" icon={FcGoogle} label="구글 로그인" />;
}
