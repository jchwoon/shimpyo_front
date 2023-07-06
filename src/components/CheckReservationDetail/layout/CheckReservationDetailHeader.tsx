import styled from 'styled-components';
import Header from '../../layout/Header';
import Navbar from '../../shared/Navbar/Navbar';
import UserMenuItem from '../../shared/UserMenu/UserMenuItem';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';

export default function CheckReservationDetailHeader() {
  const navigation = useNavigate();
  const { logoutHandler } = useLogout();

  const menuItems = (
    <div>
      <>
        <UserMenuItem bold onClick={() => navigation('/reservations?category=reservation')} label="여행" />
        <UserMenuItem divide bold onClick={() => navigation('/wishlists')} label="위시리스트" />
        <UserMenuItem onClick={() => navigation('/hosting')} label="숙소관리" />
        <UserMenuItem divide onClick={() => navigation('/account')} label="계정" />
        <UserMenuItem onClick={() => logoutHandler()} label="로그아웃" />
      </>
    </div>
  );
  return (
    <Header>
      <FlexBox>
        <Navbar logoPath="/" menuItems={menuItems}>
          <div>hi</div>
        </Navbar>
      </FlexBox>
    </Header>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
