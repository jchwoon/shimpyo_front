import { useNavigate } from 'react-router-dom';
import useResponseToViewPort from '../../../hooks/useResponseToViewPort';
import Header from '../../layout/Header';
import Navbar from '../../shared/Navbar/Navbar';
import UserMenuItem from '../../shared/UserMenu/UserMenuItem';

export default function WishListHeader() {
  const navigation = useNavigate();

  const menuItems = (
    <div>
      <UserMenuItem label="예약 내역" onClick={() => navigation('/reservations?category=reservation')} />
      <UserMenuItem divide label="관심 숙소" onClick={() => navigation('/reservations?category=reservation')} />
      <UserMenuItem label="숙소 관리" onClick={() => navigation('/reservations?category=reservation')} />
      <UserMenuItem divide label="계정" onClick={() => navigation('/reservations?category=reservation')} />
      <UserMenuItem label="로그아웃" onClick={() => navigation('/reservations?category=reservation')} />
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
