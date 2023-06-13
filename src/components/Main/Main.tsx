import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import MobileNavbar from '../MobileNavbar/MobileNavbar';
import Cards from '../Cards/Cards';
import NavbarTheme from '../OverrideTheme/NavbarTheme';
import MobileNavbarTheme from '../OverrideTheme/MobileNavbarTheme';
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

  // return (
  //   <ThemeProvider theme={defaultTheme}>
  //     <CssBaseline />
  //     {isLargeScreen ?
  //       (<DatePickerProvider>
  //         <Navbar />
  //       </DatePickerProvider>)
  //       : <MobileNavbar />
  //     }
  //     <Cards />
  //   </ThemeProvider >
  // );

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
  </>
}