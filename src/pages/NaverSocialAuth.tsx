import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useHttpRequest from '../hooks/useHttpRequest';
import { useSetRecoilState } from 'recoil';
import { emailValueAtom } from '../recoil/atoms';

interface IResultData {
  email: string;
}

export default function NaverSocialAuth() {
  const location = useLocation();
  const { sendRequest, responseData } = useHttpRequest<IResultData>();
  const setEmailValue = useSetRecoilState(emailValueAtom);

  const getAccessToken = () => {
    const token = location.hash.split('&')[0].slice(14);
    console.log(token);
    sendAccessToken(token);
  };

  const sendAccessToken = async (token: string) => {
    await sendRequest({ url: '/auth/naver', method: 'POST', body: { code: token } });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      //회원정보
      setEmailValue(responseData.result.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
}
