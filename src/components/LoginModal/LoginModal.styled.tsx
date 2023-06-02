import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

export const CustomizedMenuIcon = styled(MenuIcon)`
color: #717171;
`

export const CustomizedAccountCircleIcon = styled(AccountCircleIcon)`
color: #717171;
`