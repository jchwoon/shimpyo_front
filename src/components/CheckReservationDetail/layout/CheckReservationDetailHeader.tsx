import styled from 'styled-components';
import Header from '../../layout/Header';
import UserMenuItem from '../../shared/UserMenu/UserMenuItem';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import Logo from '../../shared/Logo';
import NonSlideUserMenu from '../../NonMemberReservationDetail/NonSlideUserMenu';
import useMenuBar from '../../../hooks/useMenuBar';
import { useRef } from 'react';

export default function CheckReservationDetailHeader() {
  const navigation = useNavigate();
  const { logoutHandler } = useLogout();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const { isOpen } = useMenuBar({ buttonRef, menuRef, initialState: false });

  const menuItems = (
    <div>
      <>
        <UserMenuItem bold onClick={() => navigation('/reservations?category=reservation')} label="여행" />
        <UserMenuItem divide bold onClick={() => navigation('/wishlists')} label="위시리스트" />
        <UserMenuItem onClick={() => navigation('/hosting')} label="숙소관리" />
        <UserMenuItem divide onClick={() => navigation('/account-settings')} label="계정" />
        <UserMenuItem onClick={() => logoutHandler()} label="로그아웃" />
      </>
    </div>
  );
  return (
    <Header>
      <FlexBox>
        <Logo height="30" width="70" path="/" />
        <NonSlideUserMenu buttonRef={buttonRef} isOpen={isOpen} menuItems={menuItems} menuRef={menuRef} />
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
