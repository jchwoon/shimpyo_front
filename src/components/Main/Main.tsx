import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import Cards from '../Cards/Cards';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { ClickAwayListener } from "@mui/material";

export default function Main() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar />
      <Cards />
    </ThemeProvider >
  );
}