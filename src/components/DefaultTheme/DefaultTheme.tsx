import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
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
    },
});

export default defaultTheme