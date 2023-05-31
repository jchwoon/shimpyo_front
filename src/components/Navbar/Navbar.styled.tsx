import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles"

import { Divider } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

export const CustomizedAppBar = styled(AppBar)`
background-color: #fff;
padding-left : 40px;
padding-right : 40px;
height: 80px
`

export const CustomizedToolBar = styled(Toolbar)`
height: 80px;
justify-content: space-between;
`

export const LogoButton = styled(Button)`
border-color: #ffffff;
:hover {
  background-color: #ffffff;
}
`

export const CustomizedSearchButton = styled(Button)`
height: 50px;
color: #000000;
background-color: #ffffff;
border-radius: 50px;
:hover {
  background-color: #ffffff;
}
padding-left: 20px;
padding-right: 10px;
`

export const CustomizedLoginButton = styled(Button)`
height: 50px;
width: 80px;
color: #000000;
background-color: #ffffff;
border-radius: 50px;
:hover {
  background-color: #ffffff;
}
padding-left: 5px;
padding-right: 5px;
justify-content: space-between;
box-shadow: unset;
`

export const CustomizedDivider = styled(Divider)`
padding-right: 15px;
`
export const CustomizedTypography = styled(Typography)`
padding-left: 15px;
padding-right: 15px;
`

export const CustomizedAvatar = styled(Avatar)`
background-color: #000000;
height:32px;
width:32px;
`

export const CustomizedSearchIcon = styled(SearchIcon)`
height:20px;
width:20px;
`
export const CustomizedMenuIcon = styled(MenuIcon)`
color: #717171;
`

export const CustomizedAccountCircleIcon = styled(AccountCircleIcon)`
color: #717171;
`