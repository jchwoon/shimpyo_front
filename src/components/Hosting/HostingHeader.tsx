import styled from 'styled-components';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Logo from '../shared/Logo';
import Button from '../shared/UI/Button';
import Header from '../layout/Header';

import useMenuBar from '../../hooks/useMenuBar';
import useLogout from '../../hooks/useLogout';

import UserMenu from '../Hosting/Menu/UserMenu';
import MenuItem from '../Hosting/Menu/MenuItem';
import MenuBlock from '../Hosting/Menu/MenuBlock';

import { BsHouseHeartFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

export default function HostingHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigation = useNavigate();
  const { logoutHandler } = useLogout();
  const { isOpen, setIsOpen } = useMenuBar({ initialState: false, menuRef, buttonRef });

  const menuItems = (
    <div>
      <MenuItem onClick={() => navigation('/reservations')} label="예약관리" bold={true} />
      <MenuItem onClick={() => navigation('/hosting')} label="숙소관리" bold={true} />
      <MenuItem onClick={() => navigation('/accommodation')} label="숙소등록" bold={true} />
      <MenuItem onClick={() => navigation('/account')} label="계정" />
      <Underline />
      <MenuItem onClick={() => logoutHandler()} label="로그아웃" />
    </div>
  );

  const slideMenuItems = (
    <>
      <MenuBlock label="메뉴">
        <MenuItem onClick={() => navigation('/reservations')} icon={BsHouseHeartFill} bold label="예약관리" />
        <MenuItem onClick={() => navigation('/hosting')} icon={BsHouseHeartFill} bold label="숙소관리" />
        <MenuItem onClick={() => navigation('/accommodation')} icon={BsHouseHeartFill} bold label="숙소등록" />
      </MenuBlock>
      <MenuBlock label="계정">
        <MenuItem onClick={() => navigation('/account')} icon={IoMdSettings} bold label="계정" />
      </MenuBlock>
      <Button onClick={() => logoutHandler()} label="로그아웃" />
    </>
  );

  return (
    <Header>
      <FlexBox>
        <Logo height="25px" path="/hosting" width="50" />
        <UserMenu
          isOpen={isOpen}
          menuRef={menuRef}
          buttonRef={buttonRef}
          menuItems={menuItems}
          slideMenuItems={slideMenuItems}
        />
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

const Underline = styled.hr`
  border: none;
  border-top: 1px solid rgb(180, 180, 180);
  margin: 10px 0;
`;
