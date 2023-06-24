import SocialButton from '../Modal/Button/SocialButton';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleSocialLogin() {
  const login = () => {
    window.location.href = 'http://shimpyo-api.p-e.kr:8081/oauth2/authorization/google';
  };

  // useGoogleLogin({
  //   windo
  //   onSuccess: async codeResponse => {
  //     console.log(codeResponse);
  //     const tokens = await axios.post('http://localhost:3001/auth/google', {
  //       code: codeResponse.code,
  //     });

  //     console.log(tokens);
  //   },
  //   onError: err => {
  //     console.log(err);
  //   },
  //   redirect_uri: 'http://shimpyo-api.p-e.kr/login/oauth2/code/google',
  //   ux_mode: 'redirect',
  //   flow: 'auth-code',
  // });
  return <SocialButton onClick={login} containerColor="#F4F4F4" icon={FcGoogle} label="구글 로그인" />;
}
