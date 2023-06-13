import { createTheme } from '@mui/material/styles';

const MobileNavbarTheme = createTheme({
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                noOptions: {
                    paddingLeft: "1px"
                },
            },
        },
    },
});

export default MobileNavbarTheme