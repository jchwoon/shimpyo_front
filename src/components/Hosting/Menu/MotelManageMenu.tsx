import styled, { keyframes } from 'styled-components';
import Menu from '../Menu';
import UserMenuItem from './MenuItem';
import { StyleMenuList } from '../../style/menu';
import { useRef } from 'react';
import UseMenuBar from '../../../hooks/UseMenuBar';
import { BiChevronDown } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

export default function MotelManageMenu() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { isOpen } = UseMenuBar({ initialState: false, menuRef, buttonRef });

  const { pathname } = useLocation();
  return (
    <Menu>
      <StyleMenu>
        <StyleMenuItem $target={pathname === '/hosting'}>
          <div>투데이</div>
        </StyleMenuItem>
        <StyleMenuItem className="menu" $target={isOpen} ref={buttonRef}>
          <div>메뉴</div>
          <BiChevronDown size={25} />
        </StyleMenuItem>
      </StyleMenu>
      {isOpen && (
        <StyleManageMenuList ref={menuRef}>
          <StyleFlexMenuList>
            <UserMenuItem bold label="숙소" />
            <UserMenuItem bold label="예약" />
            <UserMenuItem bold label="새로운 숙소 등록하기" />
          </StyleFlexMenuList>
        </StyleManageMenuList>
      )}
    </Menu>
  );
}

const smallAndBack = keyframes`
  0% {
    transform: scale(1) color;
  }

  50%{
    transform: scale(0.85);
  }

  100% {
    transform: scale(1);
  }
`;

const StyleManageMenuList = styled(StyleMenuList)`
  top: 50px;
  left: 80px;
`;

const StyleFlexMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(115 115 115);
`;

const StyleMenuItem = styled.div<{ $target?: boolean }>`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  border-radius: 0.75rem;
  :hover {
    background-color: rgb(245, 245, 245);
    cursor: pointer;
    color: black;
    text-decoration: none;
  }
  color: ${props => (props.$target ? 'black' : null)};
  &:not(.menu) {
    ::before {
      content: '';
      position: absolute;
      bottom: -2px;
      top: 35px;
      left: 27px;
      height: 1.5px;
      background-color: black;
      width: 20px;
    }
  }

  &.menu {
    :active {
      animation: ${smallAndBack} 1s linear;
    }
    border: ${props => (props.$target ? '1px solid black' : null)};
  }
`;
