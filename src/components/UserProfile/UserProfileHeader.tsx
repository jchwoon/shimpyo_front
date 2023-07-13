import styled from 'styled-components';
import Header from '../layout/Header';
import Logo from '../shared/Logo';
import NonSlideUserMenu from '../NonMemberReservationDetail/NonSlideUserMenu';
import useMenuBar from '../../hooks/useMenuBar';
import { useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import UserMenuItem from '../shared/UserMenu/UserMenuItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginStateAtom, userIdAtom } from '../../recoil/userAtoms';
import { useNavigate, useParams } from 'react-router-dom';
import { editprofileModalAtom, joinModalAtom, loginModalAtom } from '../../recoil/modalAtoms';
import useLogout from '../../hooks/useLogout';

export default function UserProfileHeader() {
  const isLoggedIn = useRecoilValue(loginStateAtom);
  const setLoginModal = useSetRecoilState(loginModalAtom);
  const setJoinModal = useSetRecoilState(joinModalAtom);
  const setEditProfileModal = useSetRecoilState(editprofileModalAtom);
  const { userId } = useParams();
  const myId = useRecoilValue(userIdAtom);
  const navigation = useNavigate();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const { isOpen } = useMenuBar({ initialState: false, buttonRef, menuRef });
  const { logoutHandler } = useLogout();

  const menuItems = (
    <div>
      {isLoggedIn ? (
        <>
          <UserMenuItem bold label="예약내역" onClick={() => navigation('/reservations?category=reservation')} />
          <UserMenuItem bold divide label="관심 숙소" onClick={() => navigation('/wishlists')} />
          <UserMenuItem label="숙소 관리" onClick={() => navigation('/hosting')} />
          <UserMenuItem divide label="계정" onClick={() => navigation('/account-settings')} />
          <UserMenuItem label="로그아웃" onClick={() => logoutHandler()} />
        </>
      ) : (
        <>
          <UserMenuItem label="로그인" onClick={() => setLoginModal(true)} />
          <UserMenuItem divide label="회원가입" onClick={() => setJoinModal(true)} />
          <UserMenuItem label="예약내역" onClick={() => navigation('/check/non-member')} />
        </>
      )}
    </div>
  );
  return (
    <Header>
      <StyleFlexBox>
        <Logo width="50" height="25" path="/" />
        <NonSlideUserMenu buttonRef={buttonRef} isOpen={isOpen} menuRef={menuRef} menuItems={menuItems} />
      </StyleFlexBox>
      <StyleMobileFlexBox>
        <IoIosArrowBack style={{ cursor: 'pointer' }} onClick={() => navigation(-1)} size={20} />
        <StyleChangeEditModeButtonBox>
          {userId && +userId === myId && (
            <button onClick={() => setEditProfileModal(true)} style={{ cursor: 'pointer', padding: '0.3rem 0.5rem' }}>
              <span style={{ fontSize: '17px', textDecoration: 'underline' }}>수정</span>
            </button>
          )}
        </StyleChangeEditModeButtonBox>
      </StyleMobileFlexBox>
    </Header>
  );
}

const StyleFlexBox = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: none;

  @media only screen and (min-width: 762px) {
    display: flex;
  }
`;

const StyleMobileFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 762px) {
    display: none;
  }
`;

const StyleChangeEditModeButtonBox = styled.div`
  border-radius: 5px;
  &:hover {
    background-color: #f7f7f7;
  }
`;
