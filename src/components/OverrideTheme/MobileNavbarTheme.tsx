import { createTheme } from '@mui/material/styles';

const MobileNavbarTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #dbdcdd',
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                noOptions: {
                    paddingLeft: "1px"
                },
                listbox: {
                    maxHeight: "150px"
                }
            },
        },
    },
});

export default MobileNavbarTheme