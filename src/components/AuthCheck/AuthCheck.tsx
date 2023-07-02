import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenAtom } from '../../recoil/userAtoms';
import { loginModalAtom } from '../../recoil/modalAtoms';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthCheckProps {
  Component: React.ComponentType;
  option: string | null;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ Component, option }) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const setLoginModal = useSetRecoilState(loginModalAtom);
  const navigation = useNavigate();

  useEffect(() => {
    const redirect = () => {
      if (option === 'ONLY_LOGIN') {
        // 토큰 검사
        if (!accessToken) {
          navigation('/');
          setLoginModal(true);
        }
      } else if (option === 'ONLY_LOGOUT') {
        if (accessToken) {
          navigation('/');
        }
      }
    };
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, navigation, option]);

  return <Component />;
};

export default AuthCheck;
