
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';

import ImageContainer from '../components/detail/Container/ImageContainer';
import MainContainer from '../components/detail/Container/MainContainer';

import { ThemeProvider } from '@mui/material/styles';
import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';
import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';

import { useState, useEffect } from 'react';

// import Navbar from '../components/Main/Navbar/Navbar';
import Navbar from '../components/detail/Navbar/Navbar';
import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';

import { useRecoilState } from 'recoil';
import { Height, Display, Change } from '../recoil/atoms';

import CssBaseline from '@mui/material/CssBaseline';
import ToggleFavorite from '../components/detail/Container/ToggleFavorite';

export default function Detail() {

  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1060);
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
    setAppBarHeight("80px")
    setCustomDisplay(false)
    setChange(false);
  }

  return (
    <>
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
    </>
  );
}

const Container = styled.div`
  padding: 70px 60px;
  max-width: 1220px;
  min-width: 800px;
  margin: 0 auto;
  @media screen and (max-width: 900px) {
    padding: 0px;
    width: 100%;
    min-width: 0;
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
  // margin-top: 24px;
  // @media screen and (max-width: 900px) {
  //   padding: 0 20px;
  // }
`;

// const Description = styled.div`
//   font-size: 14px;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 24px;
//   @media screen and (max-width: 900px) {
//     padding: 0 20px;
//   }
// `;

const Description = styled.div`
display:flex;
justify-content: space-between;
margin-top:20px;
margin-bottom:20px;
`;

const DescriptionLocation = styled.div`
  // width: auto;
  text-decoration: underline;
`;
const DescriptionLike = styled.div`
  font-weight: bold;
`;

const CustomizedDarkDiv = styled.div < { customDisplay: boolean }> `
height: 100%;
width: 100%;
background-color: #000000b3;
position: fixed;
top:0px;
left:0px;
visibility:${({ customDisplay }) => (customDisplay ? "visible" : "hidden")};
transition: 0.2s ease;
z-index:3;
`