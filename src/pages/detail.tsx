import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';

import ImageContainer from '../components/detail/Container/ImageContainer';
import MainContainer from '../components/detail/Container/MainContainer';

import { ThemeProvider } from '@mui/material/styles';
import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';
import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';

import { useState, useEffect } from 'react';

import Navbar from '../components/Main/Navbar/Navbar';
import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';

import { useRecoilState } from 'recoil';
import { Height, Display, Change } from '../recoil/atoms';

import CssBaseline from '@mui/material/CssBaseline';
import ToggleFavorite from '../components/detail/Container/ToggleFavorite';

import MobileFooter from '../components/Main/MobileFooter/MobileFooter';
import LoginModal from '../components/shared/Modal/LoginModal';

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

  const [appbarheight, setAppBarHeight] = useRecoilState(Height);
  const [customDisplay, setCustomDisplay] = useRecoilState(Display);
  const [change, setChange] = useRecoilState(Change);
  const handleClick = () => {
    setAppBarHeight('80px');
    setCustomDisplay(false);
    setChange(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CssBaseline />
        {isLargeScreen ? (
          <ThemeProvider theme={NavbarTheme}>
            <Navbar />
          </ThemeProvider>
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
        <ThemeProvider theme={MobileNavbarTheme}>
          <MobileFooter defaultValue={null} />
        </ThemeProvider>
      )}
      <LoginModal />
    </>
  );
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

const TitleWrapper = styled.div``;

const ToggleButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  font-family: 'Noto Sans KR';
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DescriptionLocation = styled.div`
  text-decoration: underline;
`;

const CustomizedDarkDiv = styled.div<{ customDisplay: boolean }>`
  height: 100%;
  width: 100%;
  background-color: #000000b3;
  position: fixed;
  top: 0px;
  left: 0px;
  visibility: ${({ customDisplay }) => (customDisplay ? 'visible' : 'hidden')};
  transition: 0.2s ease;
  z-index: 3;
`;
