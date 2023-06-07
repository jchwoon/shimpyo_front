import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../Navbar/Navbar';
import Cards from '../Cards/Cards';
import defaultTheme from '../DefaultTheme/DefaultTheme';
import { DatePickerProvider } from '@bcad1591/react-date-picker';

export default function Main() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <DatePickerProvider>
        <Navbar />
      </DatePickerProvider>
      <Cards />
    </ThemeProvider >
  );
}