import styled, { keyframes } from 'styled-components';
import Avatar from '../../shared/Avatar';
import { BiMenu } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { Dispatch, SetStateAction } from 'react';
import Menu from '../Menu';
import { FiMenu } from 'react-icons/fi';
import { StyleMenuList } from '../../style/shareStyle';

import useResponseToViewPort from '../../../hooks/useResponseToViewPort';

interface UserMenuProps {
  menuRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  menuItems: React.ReactElement;
  slideMenuItems: React.ReactElement;
  openState?: (set: Dispatch<SetStateAction<boolean>>) => void;
}

export default function UserMenu({ menuItems, slideMenuItems, buttonRef, menuRef, isOpen }: UserMenuProps) {
  const { viewPortWidth } = useResponseToViewPort();

  return (
    <Menu>
      <StyleFlexBox>
        <StyleMenuButton ref={buttonRef}>
          {viewPortWidth > 1024 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <FiMenu size={20} />
              <Avatar width="30px" height="30px" />
            </div>
          ) : isOpen ? (
            <MdClose size={20} />
          ) : (
            <BiMenu size={20} />
          )}
        </StyleMenuButton>
      </StyleFlexBox>
      {isOpen && viewPortWidth > 1024 && (
        <StyleUserMenuList ref={menuRef}>
          <StyleFlexMenuList>{menuItems}</StyleFlexMenuList>
        </StyleUserMenuList>
      )}
      {isOpen && viewPortWidth <= 1024 && (
        <StyleTotalContainer ref={menuRef} showMenu={isOpen}>
          <StyleTotalMenuBox>{slideMenuItems}</StyleTotalMenuBox>
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
  border: 0.5px solid rgb(200, 200, 200);
  border-radius: 30px;
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
  background-color: white;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 75px;
  opacity: ${props => (props.showMenu ? '1' : '0')};
  animation: ${props => (props.showMenu ? slideIn : 'none')} 0.5s;
`;

const StyleTotalMenuBox = styled.div`
  margin: 50px 0;
  padding: 0 30px 130px 30px;
`;
