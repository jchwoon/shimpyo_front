import styled, { css } from 'styled-components';
import Header from '../layout/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserMenu from '../Hosting/Menu/UserMenu';
import Logo from '../shared/Logo';
import MenuItem from '../Hosting/Menu/MenuItem';
import MenuBlock from '../Hosting/Menu/MenuBlock';
import {
  BsFillHouseAddFill,
  BsHouseGearFill,
  BsFillHouseCheckFill,
  BsFillHouseDashFill,
  BsHouseHeartFill,
} from 'react-icons/bs';
import Button from '../shared/UI/Button';
import { IoMdSettings } from 'react-icons/io';
import { useRef } from 'react';
import useMenuBar from '../../hooks/useMenuBar';
import useLogout from '../../hooks/useLogout';

export default function ReservationHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { logoutHandler } = useLogout();
  const { isOpen, setIsOpen } = useMenuBar({ initialState: false, menuRef, buttonRef });

  const toReservationCategory = () => {
    setSearchParams(searchParams => {
      searchParams.set('category', 'reservation');
      return searchParams;
    });
    setIsOpen(false);
  };

  const toVisitedCategory = () => {
    setSearchParams(searchParams => {
      searchParams.set('category', 'visited');
      return searchParams;
    });
    setIsOpen(false);
  };

  const toReservationCancelCategory = () => {
    setSearchParams(searchParams => {
      searchParams.set('category', 'cancel');
      return searchParams;
    });
    setIsOpen(false);
  };

  const slideMenuItems = (
    <>
      <MenuBlock label="내역">
        <MenuItem className="item" onClick={toReservationCategory} icon={BsFillHouseAddFill} bold label="예약 내역" />
        <MenuItem className="item" onClick={toVisitedCategory} icon={BsFillHouseCheckFill} bold label="이용 내역" />
        <MenuItem
          className="item"
          onClick={toReservationCancelCategory}
          icon={BsFillHouseDashFill}
          bold
          label="취소 내역"
        />
      </MenuBlock>
      <MenuBlock label="메뉴">
        <MenuItem onClick={() => navigation('/wishlists')} icon={BsHouseHeartFill} bold label="관심 숙소" />
      </MenuBlock>
      <MenuBlock label="계정">
        <MenuItem onClick={() => navigation('/hosting')} icon={BsHouseGearFill} bold label="숙소관리" />
        <MenuItem onClick={() => navigation('/account')} icon={IoMdSettings} bold label="계정" />
      </MenuBlock>
      <Button onClick={() => logoutHandler()} label="로그아웃" />
    </>
  );

  const menuItems = (
    <div>
      <>
        <MenuItem bold onClick={() => navigation('/reservations?category=reservation')} label="여행" />
        <MenuItem bold onClick={() => navigation('/wishlists')} label="위시리스트" />
        <Underline />
        <MenuItem onClick={() => navigation('/hosting')} label="숙소관리" />
        <MenuItem onClick={() => navigation('/account-settings')} label="계정" />
        <Underline />
        <MenuItem onClick={() => logoutHandler()} label="로그아웃" />
      </>
    </div>
  );
  return (
    <Header>
      <FlexBox>
        <Logo height="25px" path="/" width="50" />
        <StyleCategoryMenu hidden style={{ color: 'black' }}>
          <StyleCategoryMenuItem
            $target={searchParams.get('category') === 'reservation'}
            onClick={toReservationCategory}
          >
            예약 내역
          </StyleCategoryMenuItem>
          <StyleCategoryMenuItem $target={searchParams.get('category') === 'visited'} onClick={toVisitedCategory}>
            이용 내역
          </StyleCategoryMenuItem>
          <StyleCategoryMenuItem
            $target={searchParams.get('category') === 'cancel'}
            onClick={toReservationCancelCategory}
          >
            취소 내역
          </StyleCategoryMenuItem>
        </StyleCategoryMenu>
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

const StyleCategoryMenu = styled.div`
  flex-direction: row;
  gap: 1rem;
  font-size: 15px;
  font-weight: bold;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

const StyleCategoryMenuItem = styled.div<{ $target: boolean }>`
  cursor: pointer;
  position: relative;
  padding: 0.5rem 1rem;

  ${props =>
    props.$target &&
    css`
      &::after {
        content: '';
        width: 10px;
        height: 10px;
        background-color: #00adb5;
        border-radius: 100%;
        position: absolute;
        top: 33px;
        left: 45px;
      }
    `}

  &:hover {
    background-color: rgb(200, 200, 200);
    border-radius: 5px;
  }
`;

const Underline = styled.hr`
  border: none;
  border-top: 1px solid rgb(180, 180, 180);
  margin: 10px 0;
`;
