import { useGoogleLogin } from '@react-oauth/google';
import SocialButton from '../Modal/SocialButton';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

interface IAuth {
  access_token: string;
}

export default function GoogleSocialLogin() {
  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      console.log(codeResponse);
      const tokens = await axios.post('http://localhost:3001/auth/google', {
        code: codeResponse.code,
      });

      console.log(tokens);
    },
    onError: err => {
      console.log(err);
    },
    redirect_uri: 'http://localhost:3000',
    ux_mode: 'redirect',
    flow: 'auth-code',
  });
  return <SocialButton onClick={login} containerColor="#F4F4F4" icon={FcGoogle} label="구글 로그인" />;
}
