import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { CustomizedBottomNavigation } from './MobileFooter.style';

// import logo2 from '../../../../public/images/logo2.svg'
// import logo3 from '../../../../public/images/logo2.svg'

import { useSetRecoilState } from 'recoil';
import { loginModalAtom } from '../../../recoil/modalAtoms';

interface MobileFooterProps {
  defaultValue: number | null;
}

export default function MobileFooter({ defaultValue }: MobileFooterProps) {
  const [value, setValue] = React.useState(defaultValue);
  const setLoginModal = useSetRecoilState(loginModalAtom);

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
          <BottomNavigationAction
            label={
              <Typography fontFamily="Noto Sans KR" fontSize="12px" fontWeight="500">
                홈
              </Typography>
            }
            icon={
              value === 0 ? (
                <img src="images/logo2.svg" alt="website logo" style={{ width: '23px', height: '23px' }} />
              ) : (
                <img src="images/logo3.svg" alt="website logo" style={{ width: '23px', height: '23px' }} />
              )
            }
          />
          <BottomNavigationAction
            label={
              <Typography fontFamily="Noto Sans KR" fontSize="12px" fontWeight="500">
                관심 숙소
              </Typography>
            }
            icon={value === 1 ? <FavoriteIcon sx={{ color: '#00adb5' }} /> : <FavoriteIcon sx={{ color: '#666666' }} />}
          />
          <BottomNavigationAction
            onClick={() => setLoginModal(true)}
            label={
              <Typography fontFamily="Noto Sans KR" fontSize="12px" fontWeight="500">
                로그인
              </Typography>
            }
            icon={
              value === 2 ? (
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
