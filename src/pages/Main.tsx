import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Main/Navbar/Navbar';
import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';
import Cards from '../components/Main/Cards/Cards';
import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';
import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';
import MobileFooter from '../components/Main/MobileFooter/MobileFooter';
import { DatePickerProvider } from '@bcad1591/react-date-picker';
import { useState, useEffect } from "react";

export default function Main() {

  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 930);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>
    <CssBaseline />
    {
      isLargeScreen ?
        <DatePickerProvider>
          <ThemeProvider theme={NavbarTheme}>
            <Navbar />
          </ThemeProvider>
        </DatePickerProvider>
        :
        <DatePickerProvider>
          <ThemeProvider theme={MobileNavbarTheme}>
            <MobileNavbar />
          </ThemeProvider>
        </DatePickerProvider>
    }
    <Cards />
    {isLargeScreen ?
      null :
      <ThemeProvider theme={MobileNavbarTheme}>
        <MobileFooter />
      </ThemeProvider >
    }
  </>
}