import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useHttpRequest from '../hooks/useHttpRequest';
import { useSetRecoilState } from 'recoil';
import { emailValueAtom } from '../recoil/atoms';

interface IResultData {
  email: string;
}

export default function GoogleSocialAuth() {
  const [searchParams] = useSearchParams();
  const { sendRequest, responseData } = useHttpRequest<IResultData>();
  const setEmailValue = useSetRecoilState(emailValueAtom);

  const getCode = () => {
    const code = searchParams.get('code');

    if (code) {
      console.log(code);
      sendCode(code);
    }
  };

  const sendCode = async (code: string) => {
    await sendRequest({ url: '/auth/google', body: { code }, method: 'POST' });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setEmailValue(responseData.result.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    getCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
