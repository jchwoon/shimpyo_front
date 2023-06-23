import { useSetRecoilState } from 'recoil';
import { accessTokenAtom } from '../../../recoil/atoms';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useEffect } from 'react';

export default function Logout() {
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const logoutHandler = async () => {
    //엑시스 토큰

    await sendRequest({ url: '/api/logout', body: {} });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setAccessToken('');
      window.location.href = '/';
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);
  return (
    <div
      onClick={logoutHandler}
      style={{
        position: 'fixed',
        top: '40%',
        left: '30%',
        fontSize: '50px',
        zIndex: '1000',
        backgroundColor: 'white',
        border: '1px solid black',
        cursor: 'pointer',
      }}
    >
      로그아웃
    </div>
  );
}
