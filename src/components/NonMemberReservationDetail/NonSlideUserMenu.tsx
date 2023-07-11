import Menu from '../Hosting/Menu';
import styled from 'styled-components';

import { BiMenu } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { Dispatch, SetStateAction } from 'react';
import { FiMenu } from 'react-icons/fi';
import Avatar from '../shared/Avatar';
import useResponseToViewPort from '../../hooks/useResponseToViewPort';
import { StyleMenuList } from '../style/shareStyle';

interface UserMenuProps {
  menuRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  menuItems: React.ReactElement;
  openState?: (set: Dispatch<SetStateAction<boolean>>) => void;
}

export default function NonSlideUserMenu({ menuItems, buttonRef, menuRef, isOpen }: UserMenuProps) {
  const { viewPortWidth } = useResponseToViewPort();
  return (
    <Menu>
      <StyleFlexBox>
        <StyleMenuButton ref={buttonRef}>
          {viewPortWidth > 768 ? (
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
      {isOpen && (
        <StyleUserMenuList ref={menuRef}>
          <StyleFlexMenuList>{menuItems}</StyleFlexMenuList>
        </StyleUserMenuList>
      )}
    </Menu>
  );
}

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
