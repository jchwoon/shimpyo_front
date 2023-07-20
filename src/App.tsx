import './App.css';
import './fonts.css';
import { useRecoilState } from 'recoil';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { REGENERATION_REFRESH_API_PATH } from './constants/api/userApi';
import { accessTokenAtom, loginStateAtom } from './recoil/userAtoms';
import useHttpRequest from './hooks/useHttpRequest';
import useLogout from './hooks/useLogout';

interface ResultData {
  accessToken: string;
}

function App() {
  const { logoutHandler } = useLogout();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginStateAtom);

  const { responseData, sendRequest } = useHttpRequest<ResultData>();

  const sendRefreshToken = async () => {
    await sendRequest({ url: `${REGENERATION_REFRESH_API_PATH}`, withcredential: true });
  };

  useEffect(() => {
    sendRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!responseData) return;
    if (responseData.isSuccess) {
      setAccessToken(responseData.result.accessToken);
      setIsLoggedIn(true);
    } else {
      logoutHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, isLoggedIn]);
  return <Outlet />;
}

export default App;
