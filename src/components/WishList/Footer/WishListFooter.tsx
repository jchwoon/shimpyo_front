import { useRecoilValue } from 'recoil';
import LoginStateNavi from '../../shared/MobileFooter/LoginStateNavi';
import LogoutStateNavi from '../../shared/MobileFooter/LogoutStateNavi';
import { loginStateAtom } from '../../../recoil/userAtoms';

export default function WishListFooter() {
  const isLoggedIn = useRecoilValue(loginStateAtom);
  return (
    <>
      {isLoggedIn ? (
        <LoginStateNavi intersectionWidthValue={764} defaultValue={1} />
      ) : (
        <LogoutStateNavi intersectionWidthValue={764} defaultValue={1} />
      )}
    </>
  );
}
