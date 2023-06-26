import logo2 from '../../../logo2.svg';
import CustomizedMenus from '../UserMenu/UserMenu';
// import 'moment/locale/ko';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

const CustomizedAppBar = styled(AppBar) <{ appbarheight: string }>`
background-color: #fff;
padding-left : 40px;
padding-right : 40px;
height: ${({ appbarheight }) => appbarheight};
position: absolute;
transition: height 0.3s ease;
`

const CustomizedToolBar = styled(Toolbar)`
height: 80px;
justify-content: space-between;
`

const LogoButton = styled(Button)`
border-color: #ffffff;
:hover {
  background-color: #ffffff;
}
`

const CustomizedLogoTypography = styled(Typography)`
color: #00ADB5;
font-family: sunflower;
font-size: 25px;
`

export default function Navbar() {
  return (
    <CustomizedAppBar elevation={0} appbarheight={"80px"}>
      <CustomizedToolBar>
        <LogoButton disableRipple>
          <img src={logo2} alt="website logo" style={{ height: 13, marginBottom: 5 }} />
          <CustomizedLogoTypography>쉼표</CustomizedLogoTypography>
        </LogoButton>
        <CustomizedMenus />
      </CustomizedToolBar>
    </CustomizedAppBar >
  );
}
