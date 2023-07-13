import { useNavigate } from 'react-router-dom';
import useResponseToViewPort from '../../../hooks/useResponseToViewPort';
import Header from '../../layout/Header';
import Navbar from '../../shared/Navbar/Navbar';
import UserMenuItem from '../../shared/UserMenu/UserMenuItem';
import useLogout from '../../../hooks/useLogout';

export default function WishListHeader() {
  const navigation = useNavigate();
  const { logoutHandler } = useLogout();

  const menuItems = (
    <div>
      <UserMenuItem label="예약 내역" onClick={() => navigation('/reservations?category=reservation')} />
      <UserMenuItem divide label="관심 숙소" onClick={() => navigation('/wishlists')} />
      <UserMenuItem label="숙소 관리" onClick={() => navigation('/hosting')} />
      <UserMenuItem divide label="계정" onClick={() => navigation('/account-settings')} />
      <UserMenuItem label="로그아웃" onClick={() => logoutHandler()} />
    </div>
  );
  const { viewPortWidth } = useResponseToViewPort();

  return (
    <>
      {viewPortWidth > 764 && (
        <Header>
          <Navbar logoPath="/" menuItems={menuItems}></Navbar>
        </Header>
      )}
    </>
  );
}
