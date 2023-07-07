import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// import Navbar from '../components/Main/Navbar/Navbar';

import Navbar from '../components/shared/Navbar/Navbar';

import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';
import Cards from '../components/Main/Cards/Cards';

import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';
import NewMobileFooter from '../components/shared/MobileFooter/NewMobileFooter';

import { useState, useEffect } from 'react';
import AdditionalInfoModal from '../components/Main/Modal/AdditionalInfoModal';
import JoinModal from '../components/shared/Modal/JoinModal';
import LoginModal from '../components/shared/Modal/LoginModal';
import IdFindModal from '../components/Main/Modal/IdFindModal';
import PasswordFindModal from '../components/Main/Modal/PasswordFindModal';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loginModalAtom } from '../recoil/modalAtoms';

import UserMenuItem from '../components/shared/UserMenu/UserMenuItem';

import SearchBar from '../components/Main/Navbar/SearchBar';

import { Height } from '../recoil/navBarAtoms';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CustomIcon } from '../components/shared/MobileFooter/CustomIcon';

import { useNavigate } from 'react-router-dom';

export default function Main() {
  const [searchParams] = useSearchParams();
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const setLoginModal = useSetRecoilState(loginModalAtom);
  const [loginState, setLoginState] = useState(false);
  const [appbarheight, setAppBarHeight] = useRecoilState(Height);
  const navigate = useNavigate();

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
          <UserMenuItem label="로그인" onClick={() => setLoginModal(true)} />
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

  useEffect(() => {
    if (searchParams.has('redirect_url')) {
      setLoginModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const value0 = <BottomNavigationAction icon={<CustomIcon />} label="홈" onClick={() => navigate('/')} />;
  const value1 = (
    <BottomNavigationAction icon={<FavoriteIcon />} label="관심 숙소" onClick={() => console.log('hi im value1')} />
  );
  const value2 = (
    <BottomNavigationAction icon={<AccountCircleIcon />} label="로그인" onClick={() => setLoginModal(true)} />
  );

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
      {isLargeScreen ? null : <NewMobileFooter defaultValue={0} Action0={value0} Action1={value1} Action2={value2} />}
      <LoginModal />
      <JoinModal />
      <AdditionalInfoModal />
      <IdFindModal />
      <PasswordFindModal />
    </>
  );
}
