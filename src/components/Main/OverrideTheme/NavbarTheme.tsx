import { createTheme } from '@mui/material/styles';

const NavbarTheme = createTheme({
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        padding: '0px',
                    },
                    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
                        padding: '0px',
                    },

                },
            },
        },
    },
});

export default NavbarTheme