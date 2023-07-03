import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// import Navbar from '../components/Main/Navbar/Navbar';

import Navbar from '../components/shared/Navbar/Navbar';

import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';
import Cards from '../components/Main/Cards/Cards';

import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';

import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';
import MobileFooter from '../components/Main/MobileFooter/MobileFooter';
import { useState, useEffect } from 'react';
import AdditionalInfoModal from '../components/Main/Modal/AdditionalInfoModal';
import JoinModal from '../components/shared/Modal/JoinModal';
import LoginModal from '../components/shared/Modal/LoginModal';
import IdFindModal from '../components/Main/Modal/IdFindModal';
import PasswordFindModal from '../components/Main/Modal/PasswordFindModal';

import UserMenuItem from '../components/shared/UserMenu/UserMenuItem';

import SearchBar from '../components/Main/Navbar/SearchBar'

import {
  Height,
} from '../recoil/atoms';

import { useRecoilState } from 'recoil';

export default function Main() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [loginState, setLoginState] = useState(false);
  const [appbarheight, setAppBarHeight] = useRecoilState(Height);

  const menuItems = (
    <div>
      {loginState ? (
        <div>
          <UserMenuItem bold label="프로필" onClick={() => console.log('hi')} />
          <UserMenuItem divide bold label="계정" onClick={() => console.log('hi')} />
          <UserMenuItem divide label="언어 및 번역" onClick={() => console.log('hi')} />
          <UserMenuItem label="게스트 모드로 전환" onClick={() => console.log('hi')} />
          <UserMenuItem label="로그아웃" onClick={() => console.log('hi')} />
        </div>
      ) : (
        <div>
          <UserMenuItem label="로그인" onClick={() => console.log('hi')} />
          <UserMenuItem divide label="회원가입" onClick={() => console.log('hi')} />
          <UserMenuItem label="호스트가 되어보세요" onClick={() => console.log('hi')} />
        </div>
      )}
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 750);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      {isLargeScreen ? (
        <Navbar menuItems={menuItems} logoPath="/" height={appbarheight}>
          <SearchBar />
        </Navbar>
      ) : (
        <ThemeProvider theme={MobileNavbarTheme}>
          <MobileNavbar />
        </ThemeProvider>
      )}
      <Cards />
      {isLargeScreen ? null : (
        <ThemeProvider theme={MobileNavbarTheme}>
          <MobileFooter defaultValue={0} />
        </ThemeProvider>
      )}
      <LoginModal />
      <JoinModal />
      <AdditionalInfoModal />
      <IdFindModal />
      <PasswordFindModal />
    </>
  );
}
