import { CustomizedAppBar, CustomizedAvatar, CustomizedDivider, CustomizedLoginButton, CustomizedMenuIcon, CustomizedSearchButton, CustomizedSearchIcon, CustomizedToolBar, CustomizedTypography, LogoButton } from "./Navbar.styled"
import Typography from '@mui/material/Typography';
import logo from "../../logo.svg"
import { Divider } from '@mui/material';
import CustomizedMenus from "../LoginModal/LoginModal";


export default function Navbar() {
  return (
    <CustomizedAppBar position="sticky" elevation={0}>
      <CustomizedToolBar>
        <LogoButton disableRipple >
          <img src={logo} alt="website logo" style={{ height: 13, marginBottom: 5 }} />
          <Typography variant="h5" color="black" noWrap fontFamily="sunflower">
            쉼표
          </Typography>
        </LogoButton>
        <CustomizedSearchButton variant="contained" disableRipple>
          <Typography fontFamily='Noto Sans KR' fontWeight="500">
            어디든지
          </Typography>
          <CustomizedDivider orientation="vertical" flexItem />
          <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
            언제든지
          </CustomizedTypography>
          <Divider orientation="vertical" flexItem />
          <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
            게스트 추가
          </CustomizedTypography>
          <CustomizedAvatar>
            <CustomizedSearchIcon />
          </CustomizedAvatar>
        </CustomizedSearchButton>
        <CustomizedMenus />
      </CustomizedToolBar>
    </CustomizedAppBar>
  )
}