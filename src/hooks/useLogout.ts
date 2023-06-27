import { useRecoilState, useSetRecoilState } from 'recoil';

import useAuthorizedRequest from './useAuthorizedRequest';
import { useEffect } from 'react';
import { LOGOUT_API_PATH } from '../constants/api/userApi';
import { accessTokenAtom, loginStateAtom } from '../recoil/User/userAtoms';

export default function useLogout() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const setIsLoggedIn = useSetRecoilState(loginStateAtom);
  const { responseData, sendRequest } = useAuthorizedRequest({});

  const logoutHandler = async () => {
    await sendRequest({ url: LOGOUT_API_PATH, body: {} });
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
