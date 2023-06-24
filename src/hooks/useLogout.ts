import { useSetRecoilState } from 'recoil';
import { accessTokenAtom, loginStateAtom } from '../recoil/atoms';
import useAuthorizedRequest from './useAuthorizedRequest';
import { useEffect } from 'react';

export default function useLogout() {
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const setIsLoggedIn = useSetRecoilState(loginStateAtom);
  const { responseData, sendRequest } = useAuthorizedRequest({});

  const logoutHandler = async () => {
    await sendRequest({ url: '/api/logout', body: {} });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setAccessToken('');
      setIsLoggedIn(false);
      window.location.href = '/';
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  return { logoutHandler };
}
