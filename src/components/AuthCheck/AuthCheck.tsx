import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../recoil/userAtoms';

import { Navigate, useLocation } from 'react-router-dom';

interface AuthCheckProps {
  option: string | null;
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children, option }) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const currentLocation = useLocation();

  if (option === 'ONLY_LOGIN' && !accessToken) {
    return (
      <Navigate
        to={`/?redirect_url=${encodeURIComponent(currentLocation.pathname)}`}
        replace
        state={{ redirectedFrom: currentLocation }}
      />
    );
  }

  if (option === 'ONLY_LOGOUT' && accessToken) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};

export default AuthCheck;
