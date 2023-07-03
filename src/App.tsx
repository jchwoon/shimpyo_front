import './App.css';
import './fonts.css';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import useAuthorizedRequest from './hooks/useAuthorizedRequest';
import { REGENERATION_REFRESH_API_PATH } from './constants/api/userApi';
import { accessTokenAtom, loginStateAtom } from './recoil/userAtoms';

interface ResultData {
  accessToken: string;
}

function App() {
  const navigation = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginStateAtom);

  //권한 없을때 발생하는 함수
  const handleUnAutorization = (error: AxiosError) => {
    setIsLoggedIn(false);
    navigation('/');
    console.error(error.message);
  };

  const { responseData, sendRequest } = useAuthorizedRequest<ResultData>({
    onUnauthorized: handleUnAutorization,
  });

  useEffect(() => {
    const sendRefreshToken = async () => {
      if (!isLoggedIn) return;
      await sendRequest({ url: `${REGENERATION_REFRESH_API_PATH}`, withCredentials: true });

      if (responseData && responseData.result) {
        setAccessToken(responseData.result.accessToken);
        setIsLoggedIn(true);
      }
    };
    sendRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);
  return (
    <>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </>
  );
}

export default App;
