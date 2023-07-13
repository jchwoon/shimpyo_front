import styled from 'styled-components';
import Header from '../layout/Header';
import Logo from '../shared/Logo';
import useMenuBar from '../../hooks/useMenuBar';
import { useRef } from 'react';
import MenuItem from '../Hosting/Menu/MenuItem';
import NonSlideUserMenu from './NonSlideUserMenu';
import { useSetRecoilState } from 'recoil';
import { joinModalAtom, loginModalAtom } from '../../recoil/modalAtoms';

export default function NonMemberReservationDetailHeader() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { isOpen, setIsOpen } = useMenuBar({ initialState: false, menuRef, buttonRef });
  const setIsOpenLoginModal = useSetRecoilState(loginModalAtom);
  const setIsOpenJoinModla = useSetRecoilState(joinModalAtom);

  const menuItems = (
    <div>
      <MenuItem bold label="로그인" onClick={() => setIsOpenLoginModal(true)} />
      <MenuItem label="회원가입" onClick={() => setIsOpenJoinModla(true)} />
    </div>
  );
  return (
    <Header>
      <StyleFlexBox>
        <Logo height="30" width="70" path="/" />
        <NonSlideUserMenu buttonRef={buttonRef} menuItems={menuItems} menuRef={menuRef} isOpen={isOpen} />
      </StyleFlexBox>
    </Header>
  );
}

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
