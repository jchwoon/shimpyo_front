import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import Cards from '../Cards/Cards';
import defaultTheme from '../DefaultTheme/DefaultTheme';

export default function Main() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Cards />
      </main >
    </ThemeProvider >
  );
}