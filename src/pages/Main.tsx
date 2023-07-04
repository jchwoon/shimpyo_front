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
import JoinModal from '../components/shared/Modal/JoinModal';
import LoginModal from '../components/shared/Modal/LoginModal';
import IdFindModal from '../components/Main/Modal/IdFindModal';
import PasswordFindModal from '../components/Main/Modal/PasswordFindModal';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginModalAtom } from '../recoil/modalAtoms';

export default function Main() {
  const [searchParams] = useSearchParams();
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const setLoginModal = useSetRecoilState(loginModalAtom);

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
