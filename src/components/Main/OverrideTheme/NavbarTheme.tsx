import { createTheme } from '@mui/material/styles';

const NavbarTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #dbdcdd',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    border: '1px solid #dbdcdd',
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: "20px"
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot : {
                    paddingLeft: "0px",
                    paddingTop:"0px",
                    paddingBottom:"0px"
                }
            },
        }
    },
});

export default NavbarTheme