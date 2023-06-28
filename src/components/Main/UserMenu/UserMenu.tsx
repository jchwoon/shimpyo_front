import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { CustomizedLoginButton, CustomizedMenuIcon, CustomizedAccountCircleIcon } from './UserMenu.style';
import Typography from '@mui/material/Typography';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { joinModalAtom, loginModalAtom } from '../../../recoil/modalAtoms';
import { loginStateAtom } from '../../../recoil/userAtoms';
import useLogout from '../../../hooks/useLogout';
import { useNavigate } from 'react-router';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const { logoutHandler } = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isLoggedIn = useRecoilValue(loginStateAtom);
  const setLoginModal = useSetRecoilState(loginModalAtom);
  const setJoinModal = useSetRecoilState(joinModalAtom);
  const navigation = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CustomizedLoginButton
        variant="contained"
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        // disableElevation
        onClick={handleClick}
        disableRipple
      >
        <CustomizedMenuIcon />
        <CustomizedAccountCircleIcon sx={{ height: 35, width: 35 }} />
      </CustomizedLoginButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isLoggedIn ? (
          <div>
            <MenuItem
              onClick={() => {
                handleClose();
                navigation('/reservations');
              }}
              disableRipple
            >
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                예약
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigation('/interest_lists');
              }}
              disableRipple
            >
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                관심 숙소
              </Typography>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem>
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                숙소 관리
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                계정
              </Typography>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                handleClose();
                logoutHandler();
              }}
              disableRipple
            >
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                로그아웃
              </Typography>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              onClick={() => {
                handleClose();
                setLoginModal(true);
              }}
              disableRipple
            >
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                로그인
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setJoinModal(true);
              }}
              disableRipple
            >
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                회원가입
              </Typography>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <Typography fontFamily="Noto Sans KR" fontWeight="400">
                호스트가 되어보세요
              </Typography>
            </MenuItem>
          </div>
        )}
      </StyledMenu>
    </div>
  );
}
