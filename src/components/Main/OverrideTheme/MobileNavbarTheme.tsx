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
                inputRoot : {
                    paddingLeft: "0px",
                    paddingTop:"0px",
                    paddingBottom:"0px"
                }
            },
        },
        // MuiBottomNavigation: {
        //     styleOverrides: {
        //         root: {
        //             '&.Mui-selected': {
        //                 color: 'red', // 선택된 아이템의 색을 변경합니다.
        //             },
        //         }
        //     }
        // }
    },
});

export default MobileNavbarTheme