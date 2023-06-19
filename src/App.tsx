import './App.css';
import './fonts.css';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';
import { accessTokenAtom } from './recoil/atoms';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import useAuthorizedRequest from './hooks/useAuthorizedRequest';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface ResultData {
  accessToken: string;
}

function App() {
  const navigation = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  //권한 없을때 발생하는 함수
  const handleUnAutorization = (error: AxiosError) => {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    navigation('/');
    console.error(error.message);
  };

  const { responseData, sendRequest } = useAuthorizedRequest<ResultData>({
    onUnauthorized: handleUnAutorization,
  });

  useEffect(() => {
    const sendRefreshToken = async () => {
      if (!localStorage.getItem('isLoggedIn')) return;
      console.log('refresh');
      await sendRequest({ url: '/api/refresh', withCredentials: true });

      if (responseData && responseData.result) {
        setAccessToken(responseData.result.accessToken);
      }
    };

    sendRefreshToken();
  }, []);
  return (
    <>
      <GoogleOAuthProvider clientId="1034913727334-csbf3k5ajfe5s5c1gpi8veo7pq2j94rl.apps.googleusercontent.com">
        <RecoilRoot>
          <Outlet />
        </RecoilRoot>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
