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
                },
                inputRoot: {
                    paddingLeft: "0px",
                    paddingTop: "0px",
                    paddingBottom: "0px"
                }
            },
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#00adb5'
                    },
                }
            }
        }
    },
});

export default MobileNavbarTheme