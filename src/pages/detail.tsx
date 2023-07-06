
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';

import ImageContainer from '../components/detail/Container/ImageContainer';
import MainContainer from '../components/detail/Container/MainContainer';

import { ThemeProvider } from '@mui/material/styles';
import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';
import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';

import { useState, useEffect } from 'react';

// import Navbar from '../components/Main/Navbar/Navbar';
import Navbar from '../components/shared/Navbar/Navbar';
import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';


import { useRecoilState, useSetRecoilState } from 'recoil';
import { Height, Display, Change } from '../recoil/navBarAtoms';
import { loginModalAtom } from '../recoil/modalAtoms';

import CssBaseline from '@mui/material/CssBaseline';
import ToggleFavorite from '../components/detail/Container/ToggleFavorite';

import NewMobileFooter from '../components/shared/MobileFooter/NewMobileFooter';

import UserMenuItem from '../components/shared/UserMenu/UserMenuItem';

import SearchBar from '../components/Main/Navbar/SearchBar'

import LoginModal from '../components/shared/Modal/LoginModal';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import CustomizedBottomNavigation from '../components/shared/MobileFooter/CustomizedBottomNavigaton';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { CustomIcon } from '../components/shared/MobileFooter/CustomIcon';

export default function Detail() {

  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

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

  const [loginState, setLoginState] = useState(false);
  const [appbarheight, setAppBarHeight] = useRecoilState(Height);
  const setLoginModal = useSetRecoilState(loginModalAtom);

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
          <UserMenuItem divide label="회원가입" onClick={() => console.log('hi!')} />
          <UserMenuItem label="호스트가 되어보세요" onClick={() => console.log('hi')} />
        </div>
      )}
    </div>
  );

  const [customDisplay, setCustomDisplay] = useRecoilState(Display);
  const [change, setChange] = useRecoilState(Change);
  const handleClick = () => {
    setAppBarHeight("80px")
    setCustomDisplay(false)
    setChange(false);
  }

  const navigate = useNavigate()

  const value0 = <BottomNavigationAction icon={<CustomIcon />} label="홈" onClick={() => navigate('/')} />
  const value1 = <BottomNavigationAction icon={<FavoriteIcon />} label="관심 숙소" onClick={() => console.log("hi im value1")} />
  const value2 = <BottomNavigationAction icon={<AccountCircleIcon />} label="로그인" onClick={() => setLoginModal(true)} />

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
        <Container>
          <CustomizedDarkDiv onClick={handleClick} customDisplay={customDisplay} />
          <Description>
            <TitleWrapper>
              <Title>Title</Title>
              <DescriptionLocation>Explaination</DescriptionLocation>
            </TitleWrapper>
            <ToggleButtonWrapper>
              <ToggleFavorite />
            </ToggleButtonWrapper>
          </Description>
          <ImageContainer />
          <MainContainer />
        </Container>
      </div>
      {isLargeScreen ? null : (
        <NewMobileFooter
          defaultValue={null}
          Action0={value0}
          Action1={value1}
          Action2={value2}
        />
      )}
      <LoginModal />
    </>
  )
}

const Container = styled.div`
    padding: 70px 60px;
    max-width: 1220px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @media screen and (max-width: 749px) {
      padding: 70px 24px 0px 24px;
    width: 100%;
  }
    @media screen and (max-width: 599px) {
      padding: 70px 16px 0px 16px;
    width: 100%;
  }
    `;

const TitleWrapper = styled.div`
    `

const ToggleButtonWrapper = styled.div`
    display:flex;
    align-items: flex-end;
    margin-bottom:10px;
    `

const Title = styled.div`
    font-size: 26px;
    font-weight: bold;
    font-family: "Noto Sans KR";
    `;

const Description = styled.div`
    display:flex;
    justify-content: space-between;
    margin-top:20px;
    margin-bottom:20px;
    `;

const DescriptionLocation = styled.div`
    text-decoration: underline;
    `;

const CustomizedDarkDiv = styled.div < { customDisplay: boolean }> `
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top:0px;
    left:0px;
    visibility:${({ customDisplay }) => (customDisplay ? "visible" : "hidden")};
    transition: 0.2s ease;
    z-index:3;
    `