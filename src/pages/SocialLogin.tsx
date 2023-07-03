import { useEffect } from 'react';
import useHttpRequest from '../hooks/useHttpRequest';
import { useSearchParams } from 'react-router-dom';
import { SOCIAL_SILENT_LOGIN_API_PATH } from '../constants/api/userApi';
import { useSetRecoilState } from 'recoil';
import { accessTokenAtom } from '../recoil/userAtoms';

interface IResultData {
  accessToken: string;
}

export default function SocialLogin() {
  const { responseData, sendRequest } = useHttpRequest<IResultData>();
  const [searchParams] = useSearchParams();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const getSilentToken = async () => {
    const userId = searchParams.get('user_id');
    await sendRequest({ url: SOCIAL_SILENT_LOGIN_API_PATH, method: 'POST', body: { id: userId } });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setAccessToken(responseData.result.accessToken);
      //리다이렉트
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    getSilentToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
