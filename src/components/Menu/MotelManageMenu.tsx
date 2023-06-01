import styled from 'styled-components';
import Menu from '../Menu';
import UserMenuItem from './MenuItem';
import { StyleMenuList } from '../style/menu';
import { useRef } from 'react';
import UseMenuBar from '../../hooks/UseMenuBar';
import { BiChevronDown } from 'react-icons/bi';

export default function MotelManageMenu() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { isOpen } = UseMenuBar({ initialState: false, menuRef, buttonRef });
  return (
    <Menu>
      <StyleMenu>
        <StyleMenuItem>
          <div>투데이</div>
        </StyleMenuItem>
        <StyleMenuItem ref={buttonRef}>
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
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(115 115 115);
`;

const StyleMenuItem = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  :hover {
    border-radius: 0.75rem;
    background-color: rgb(245, 245, 245);
    cursor: pointer;
    color: black;
  }
`;
