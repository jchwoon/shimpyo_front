import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Pay/Navbar';
import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';
import { ThemeProvider } from '@mui/material/styles';
import MainContainer from '../components/Pay/Container/MainContainer';

export default function Pay() {
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
    return (
        <>
            <CssBaseline />
            {isLargeScreen ? (
                <ThemeProvider theme={NavbarTheme}>
                    <Navbar />
                </ThemeProvider>
            ) :
                null}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <MainContainer />
            </div>
        </>
    )
}