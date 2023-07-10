import styled from 'styled-components';
import MotelManageMenu from './Menu/MotelManageMenu';
import Header from '../layout/Header';
import { useRecoilState } from 'recoil';
import { loginStateAtom } from '../../recoil/userAtoms';
import UserMenu from './Menu/UserMenu';
import Logo from '../shared/Logo';
import MenuItem from './Menu/MenuItem';
import MenuBlock from './Menu/MenuBlock';
import Button from '../shared/UI/Button';
import { SlHandbag } from 'react-icons/sl';
import { IoMdSettings } from 'react-icons/io';
import { RiMailOpenLine, RiGlobalLine } from 'react-icons/ri';
import { MdCalendarToday } from 'react-icons/md';
import { BsHouseAdd, BsCreditCard2Back, BsHouseDoor } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import useMenuBar from '../../hooks/useMenuBar';
import { useRef } from 'react';

export default function HostingHeader() {
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { isOpen, setIsOpen } = useMenuBar({ initialState: false, menuRef, buttonRef });

  const menuItems = (
    <div>
      {loginState ? (
        <div>
          <MenuItem bold label="프로필" />
          <MenuItem bold label="계정" />
          <Underline />
          <MenuItem label="언어 및 번역" />
          <MenuItem label="KRW" />
          <Underline />
          <MenuItem label="게스트 모드로 전환" />
          <MenuItem label="로그아웃" />
        </div>
      ) : (
        <div>
          <MenuItem bold label="로그인" onClick={() => console.log('hi')} />
          <MenuItem label="로그아웃" onClick={() => console.log('hi')} />
          <Underline />
          <MenuItem label="로그아웃" onClick={() => console.log('hi')} />
        </div>
      )}
    </div>
  );

  const slideMenuItems = (
    <>
      <MenuBlock label="메뉴">
        <MenuItem icon={RiMailOpenLine} bold label="투데이" />
        <MenuItem icon={MdCalendarToday} bold label="달력" />
        <MenuItem icon={BsHouseDoor} bold label="숙소" />
        <MenuItem icon={SlHandbag} bold label="예약" />
      </MenuBlock>
      <MenuBlock label="계정">
        <MenuItem icon={CgProfile} bold label="프로필" />
        <MenuItem icon={IoMdSettings} bold label="계정 관리" />
        <MenuItem icon={BsHouseAdd} bold label="새로운 숙소 등록하기" />
      </MenuBlock>
      <MenuBlock label="설정">
        <MenuItem icon={RiGlobalLine} bold label="언어 및 번역" />
        <MenuItem icon={BsCreditCard2Back} bold label="KRW" />
      </MenuBlock>
      <Button label="게스트 모드로 전환" />
      <Button label="로그아웃" />
    </>
  );
  return (
    <Header>
      <FlexBox>
        <Logo height="25px" path="/hosting" width="50" />
        <StyleHeaderMenuBox hidden>
          <MotelManageMenu />
        </StyleHeaderMenuBox>
        <UserMenu
          menuRef={menuRef}
          buttonRef={buttonRef}
          isOpen={isOpen}
          slideMenuItems={slideMenuItems}
          menuItems={menuItems}
        />
      </FlexBox>
    </Header>
  );
}

const StyleHeaderMenuBox = styled.div`
  position: relative;
  @media only screen and (min-width: 1024px) {
    display: block;
  }
`;

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
