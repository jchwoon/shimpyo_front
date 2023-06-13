import { RecoilRoot, useSetRecoilState } from 'recoil';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { accessTokenAtom } from './recoil/atom';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import useAuthorizedRequest from './hooks/useAuthorizedRequest';

interface ResultData {
  accessToken: string;
}

function App() {
  const navigation = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

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
      await sendRequest({ url: '/api/refresh', withCredentials: true });

      if (responseData && responseData.result) {
        setAccessToken(responseData.result.accessToken);
      }
    };

    sendRefreshToken();
  }, [responseData, sendRequest, setAccessToken]);
  return (
    <>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </>
  );
}

export default App;
