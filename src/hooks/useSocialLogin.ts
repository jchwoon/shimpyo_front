import { useEffect } from 'react';
import { SOCIAL_LOGIN_API_PATH } from '../constants/api';
import useHttpRequest from './useHttpRequest';
import { useSetRecoilState } from 'recoil';
import { accessTokenAtom } from '../recoil/atoms';

interface IResultData {
  accessToken?: string;
}

interface useSocialLoginProps {
  provider: string;
}

export default function useSocialLogin({ provider }: useSocialLoginProps) {
  const { responseData, sendRequest } = useHttpRequest<IResultData>();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const login = async () => {
    await sendRequest({ url: SOCIAL_LOGIN_API_PATH, body: { provider } });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      if (responseData?.result.accessToken) {
        setAccessToken(responseData.result.accessToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  return { login };
}
