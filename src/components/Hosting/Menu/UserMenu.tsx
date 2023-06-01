import styled, { keyframes } from 'styled-components';
import UserMenuItem from './MenuItem';
import Avatar from '../../shared/Avatar';
import { BiMenu } from 'react-icons/bi';
import { RiMailOpenLine, RiGlobalLine } from 'react-icons/ri';
import { MdCalendarToday, MdClose } from 'react-icons/md';
import { SlHandbag } from 'react-icons/sl';
import { IoMdSettings } from 'react-icons/io';
import { BsHouseAdd, BsCreditCard2Back, BsHouseDoor } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useState, useEffect, useRef } from 'react';
import MenuBlock from './MenuBlock';
import Menu from '../Menu';
import { StyleMenuList } from '../../style/menu';
import Button from '../../shared/UI/Button';
import UseMenuBar from '../../../hooks/UseMenuBar';

export default function UserMenu() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { isOpen } = UseMenuBar({ initialState: false, menuRef, buttonRef });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Menu>
      <StyleFlexBox>
        <StyleMenuButton ref={buttonRef}>
          {viewportWidth > 1024 ? <Avatar /> : isOpen ? <MdClose size={20} /> : <BiMenu size={20} />}
        </StyleMenuButton>
      </StyleFlexBox>
      {isOpen && viewportWidth > 1024 && (
        <StyleUserMenuList ref={menuRef}>
          <StyleFlexMenuList>
            <UserMenuItem bold label="프로필" />
            <UserMenuItem bold label="계정" />
            <Underline />
            <UserMenuItem label="언어 및 번역" />
            <UserMenuItem label="KRW" />
            <Underline />
            <UserMenuItem label="게스트 모드로 전환" />
            <UserMenuItem label="로그아웃" />
          </StyleFlexMenuList>
        </StyleUserMenuList>
      )}
      {isOpen && viewportWidth <= 1024 && (
        <StyleTotalContainer showMenu={isOpen}>
          <StyleTotalMenuBox>
            <MenuBlock label="메뉴">
              <UserMenuItem icon={RiMailOpenLine} bold label="투데이" />
              <UserMenuItem icon={MdCalendarToday} bold label="달력" />
              <UserMenuItem icon={BsHouseDoor} bold label="숙소" />
              <UserMenuItem icon={SlHandbag} bold label="예약" />
            </MenuBlock>
            <MenuBlock label="계정">
              <UserMenuItem icon={CgProfile} bold label="프로필" />
              <UserMenuItem icon={IoMdSettings} bold label="계정 관리" />
              <UserMenuItem icon={BsHouseAdd} bold label="새로운 숙소 등록하기" />
            </MenuBlock>
            <MenuBlock label="설정">
              <UserMenuItem icon={RiGlobalLine} bold label="언어 및 번역" />
              <UserMenuItem icon={BsCreditCard2Back} bold label="KRW" />
            </MenuBlock>
            <Button label="게스트 모드로 전환" />
            <Button label="로그아웃" />
          </StyleTotalMenuBox>
        </StyleTotalContainer>
      )}
    </Menu>
  );
}

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyleMenuButton = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  border: 0.5px solid rgb(235, 235, 235);
  border-radius: 100%;
`;

export const StyleUserMenuList = styled(StyleMenuList)`
  top: 50px;
  left: -190px;
`;

const StyleFlexMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleTotalContainer = styled.div<{ showMenu: boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 90px;
  opacity: ${props => (props.showMenu ? '1' : '0')};
  animation: ${props => (props.showMenu ? slideIn : 'none')} 0.5s;
`;

const StyleTotalMenuBox = styled.div`
  margin: 50px 0;
  padding: 0 30px 130px 30px;
`;

const Underline = styled.hr`
  border: none;
  border-top: 1px solid rgb(180, 180, 180);
  margin: 10px 0;
`;
