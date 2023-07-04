import { BottomNavigationAction, Box, Paper, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CustomizedBottomNavigation } from '../Main/MobileFooter/MobileFooter.style';
import { useState } from 'react';
import logo2 from '../../logo2.svg';
import logo3 from '../../logo3.svg';

export default function WishListFooter() {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <Box sx={{ width: 500 }}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <CustomizedBottomNavigation
          showLabels
          value={currentIndex}
          onChange={(_, index) => {
            setCurrentIndex(index);
          }}
        >
          <BottomNavigationAction
            label={
              <Typography fontFamily="Noto Sans KR" fontSize="12px" fontWeight="500">
                홈
              </Typography>
            }
            icon={
              currentIndex === 0 ? (
                <img src={logo2} alt="website logo" style={{ width: '23px', height: '23px' }} />
              ) : (
                <img src={logo3} alt="website logo" style={{ width: '23px', height: '23px' }} />
              )
            }
          />
          <BottomNavigationAction
            label={
              <Typography fontFamily="Noto Sans KR" fontSize="12px" fontWeight="500">
                관심 숙소
              </Typography>
            }
            icon={
              currentIndex === 1 ? (
                <FavoriteIcon sx={{ color: '#00adb5' }} />
              ) : (
                <FavoriteIcon sx={{ color: '#666666' }} />
              )
            }
          />
          <BottomNavigationAction
            label={
              <Typography fontFamily="Noto Sans KR" fontSize="12px" fontWeight="500">
                여행
              </Typography>
            }
            icon={
              currentIndex === 2 ? (
                <AccountCircleIcon sx={{ color: '#00adb5' }} />
              ) : (
                <AccountCircleIcon sx={{ color: '#666666' }} />
              )
            }
          />
          <BottomNavigationAction
            label={
              <Typography fontFamily="Noto Sans KR" fontSize="12px" fontWeight="500">
                프로필
              </Typography>
            }
            icon={
              currentIndex === 3 ? (
                <AccountCircleIcon sx={{ color: '#00adb5' }} />
              ) : (
                <AccountCircleIcon sx={{ color: '#666666' }} />
              )
            }
          />
        </CustomizedBottomNavigation>
      </Paper>
    </Box>
  );
}
