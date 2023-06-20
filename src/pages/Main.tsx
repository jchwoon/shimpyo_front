import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Main/Navbar/Navbar';
import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';
import Cards from '../components/Main/Cards/Cards';
import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';
import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';
import MobileFooter from '../components/Main/MobileFooter/MobileFooter';
import { useState, useEffect } from 'react';
import AdditionalInfoModal from '../components/Main/Modal/AdditionalInfoModal';
import JoinModal from '../components/Main/Modal/JoinModal';
import LoginModal from '../components/Main/Modal/LoginModal';
import IdFindModal from '../components/Main/Modal/IdFindModal';
import PasswordFindModal from '../components/Main/Modal/PasswordFindModal';

export default function Main() {
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
      <Cards />
      {isLargeScreen ? null : (
        <ThemeProvider theme={MobileNavbarTheme}>
          <MobileFooter />
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
