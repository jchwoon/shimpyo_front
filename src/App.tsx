import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
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

  console.log(accessToken);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, setAccessToken]);
  return (
    <>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </>
  );
}

export default App;
