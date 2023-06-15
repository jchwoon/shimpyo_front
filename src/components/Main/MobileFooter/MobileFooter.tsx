import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { CustomizedBottomNavigation } from './MobileFooter.style';

import logo2 from "../../../logo2.svg"
import logo3 from "../../../logo3.svg"

export default function MobileFooter() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: 500 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <CustomizedBottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label={<Typography fontFamily='Noto Sans KR' fontSize="12px" fontWeight="500">홈</Typography>} icon={value === 0 ? <img src={logo2} alt="website logo" style={{ width: "23px", height: "23px" }} /> : <img src={logo3} alt="website logo" style={{ width: "23px", height: "23px" }} />} />
                    <BottomNavigationAction label={<Typography fontFamily='Noto Sans KR' fontSize="12px" fontWeight="500">관심 숙소</Typography>} icon={value === 1 ? <FavoriteIcon sx={{ color: "#00adb5" }} /> : <FavoriteIcon sx={{ color: "#666666" }} />} />
                    <BottomNavigationAction label={<Typography fontFamily='Noto Sans KR' fontSize="12px" fontWeight="500">로그인</Typography>} icon={value === 2 ? <AccountCircleIcon sx={{ color: "#00adb5" }} /> : <AccountCircleIcon sx={{ color: "#666666" }} />} />
                </CustomizedBottomNavigation>
            </Paper>
        </Box>
    );
}