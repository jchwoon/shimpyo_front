import styled from 'styled-components';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';

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

import {
  accommodationState,
  addressCheckState,
  disabledState,
  errorModalState,
  imageDataState,
  imageListState,
  roomImageListState,
  stepState,
} from '../../recoil/accommodationAtoms';

import { selectedAccommodationIdState } from '../../recoil/hostingAtoms';

export default function HostingHeader() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigation = useNavigate();
  const { logoutHandler } = useLogout();
  const { isOpen, setIsOpen } = useMenuBar({ initialState: false, menuRef, buttonRef });

  const navigate = useNavigate();
  const resetStepState = useResetRecoilState(stepState);
  const resetAccommodationState = useResetRecoilState(accommodationState);
  const resetDisabledState = useResetRecoilState(disabledState);
  const resetAddressCheckState = useResetRecoilState(addressCheckState);
  const resetErrorModalState = useResetRecoilState(errorModalState);
  const resetImageDataState = useResetRecoilState(imageDataState);
  const resetImageListState = useResetRecoilState(imageListState);
  const resetRoomImageListState = useResetRecoilState(roomImageListState);
  const resetSelectedAccommodationId = useResetRecoilState(selectedAccommodationIdState);

  const moveAccommodationPage = (url: string) => () => {
    resetStepState();
    resetAccommodationState();
    resetDisabledState();
    resetAddressCheckState();
    resetErrorModalState();
    resetImageDataState();
    resetImageListState();
    resetRoomImageListState();
    resetSelectedAccommodationId();
    navigate(url);
  };

  const menuItems = (
    <div>
      <MenuItem onClick={moveAccommodationPage('/reservations')} label="예약관리" bold={true} />
      <MenuItem onClick={moveAccommodationPage('/hosting')} label="숙소관리" bold={true} />
      <MenuItem onClick={moveAccommodationPage('/accommodation')} label="숙소등록" bold={true} />
      <MenuItem onClick={moveAccommodationPage('/account-settings')} label="계정" />
      <Underline />
      <MenuItem onClick={() => logoutHandler()} label="로그아웃" />
    </div>
  );

  const slideMenuItems = (
    <>
      <MenuBlock label="메뉴">
        <MenuItem onClick={moveAccommodationPage('/reservations')} icon={BsHouseHeartFill} bold label="예약관리" />
        <MenuItem onClick={moveAccommodationPage('/hosting')} icon={BsHouseHeartFill} bold label="숙소관리" />
        <MenuItem onClick={moveAccommodationPage('/accommodation')} icon={BsHouseHeartFill} bold label="숙소등록" />
      </MenuBlock>
      <MenuBlock label="계정">
        <MenuItem onClick={moveAccommodationPage('/account-settings')} icon={IoMdSettings} bold label="계정" />
      </MenuBlock>
      <Button onClick={() => logoutHandler()} label="로그아웃" />
    </>
  );

  return (
    <Header>
      <FlexBox>
        <Logo height="25px" path="/" width="50" />
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
