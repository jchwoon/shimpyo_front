import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import { Autocomplete, Card, Divider, IconButton, Menu, MenuItem, TextField } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

import ClearIcon from '@mui/icons-material/Clear';

export const CustomizedAppBar = styled(AppBar) <{ appbarheight: string }>`
background-color: #fff;
padding-left : 40px;
padding-right : 40px;
height: ${({ appbarheight }) => appbarheight};
position: fixed;
transition: height 0.3s ease;
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


export const CustomizedSearchButtonWrapperDiv = styled.div<{ change: boolean | undefined }>`
display:flex;
align-items: flex-end;
height: ${({ change }) => (change ? "240px" : "50px")};
transition: 0.3s ease;
padding-bottom:${({ change }) => (change ? "10px" : "0px")};
`

export const CustomizedWhereVerticalWrapperDiv = styled.div<{ change: boolean | undefined }>`
display:flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 200px;
`

export const CustomizedWhenVerticalWrapperDiv = styled.div<{ change: boolean | undefined }>`
display:flex;
flex-direction: column;
justify-content: flex-end;
`
interface CustomizedAddtionalWhenVerticalWrapperDivProps {
  change: boolean | undefined;
}

export const CustomizedAddtionalWhenVerticalWrapperDiv = styled.div<CustomizedAddtionalWhenVerticalWrapperDivProps>`
display:${({ change }) => (change ? "flex" : "none")};
flex-direction: column;
justify-content: flex-end;
`

export const CustomizedGuestVerticalWrapperDiv = styled.div<{ change: boolean | undefined }>`
display:flex;
flex-direction: column;
justify-content: flex-end;
`

// export const CustomizedSearchButton = styled(Button) <{ change: boolean, activeButton: string }>`
// height: ${({ change }) => (change ? "70px" : "50px")};
// display: flex;
// justify-content: center; 
// color: #000000;
// background-color: ${({ activeButton }) => (activeButton === "" ? "#ffffff" : "#ebebeb")};
// border-radius: 50px;
// :hover {
//   background-color:${({ activeButton }) => (activeButton === "" ? "#ffffff" : "#ebebeb")};
// }
// padding-left: 0px;
// padding-right: 10px;
// transition: 0.2s ease;
// `

export const CustomizedSearchButton = styled(Card) <{ change: boolean | undefined, activebutton: string }>`
height: ${({ change }) => (change ? "70px" : "50px")};
display: flex;
justify-content: center; 
color: #000000;
background-color: ${({ activebutton }) => (activebutton === "" ? "#ffffff" : "#ebebeb")};
border-radius: 50px;
:hover {
  background-color:${({ activebutton }) => (activebutton === "" ? "#ffffff" : "#ebebeb")};
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}
padding-left: 0px;
padding-right: 10px;
transition: 0.2s ease;
position:relative;
overflow: visible;
`

export const CustomizedWhereActiveSearchButton = styled(Card)`
color: #000000;
background-color: #ffffff;
border-radius: 50px;
:hover {
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
height: 70px;
padding: 6px 20px 6px 20px;
display:flex;
align-items: center;
`

export const CustomizedWhereSearchInsideButton = styled(Card)`
color: #000000;
border-radius: 50px;
:hover {
  background-color: #ebebeb;
}
border: 0px;
height: 70px;
`

export const CustomizedActiveSearchButton = styled(Button)`
color: #000000;
background-color: #ffffff;
border-radius: 50px;
:hover {
  background-color: #ffffff;
}
height: 70px;
`

export const CustomizedSearchInsideButton = styled(Button) <{ change: boolean | undefined }>`
color: #000000;
border-radius: 50px;
:hover {
  background-color: #ebebeb;
}
border: 0px;
height: 70px;
`

export const CustomizedAdditionalActiveSearchButton = styled(Button) <{ change: boolean | undefined }>`
display:${({ change }) => (change ? "flex" : "none")};
color: #000000;
background-color: #ffffff;
border-radius: 50px;
:hover {
  background-color: #ffffff;
}
height: 70px;
`

export const CustomizedAdditionalSearchInsideButton = styled(Button) <{ change: boolean | undefined }>`
display:${({ change }) => (change ? "flex" : "none")};
color: #000000;
border-radius: 50px;
:hover {
  background-color: #ebebeb;
}
border: 0px;
height: 70px;
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
`

export const CustomizedAdditionalDivider = styled(Divider) <{ change: boolean | undefined }>`
display:${({ change }) => (change ? "flex" : "none")};
`

export const CustomizedTypography = styled(Typography)`
`

interface CustomizedChangeTypographyProps {
  change: boolean | undefined;
}

export const CustomizedChangeTypography = styled(Typography) <CustomizedChangeTypographyProps>`
display:${({ change }) => (change ? "block" : "none")};
color: #a2a2a2;
font-family: Noto Sans KR;
font-weight: 300;
font-size: 15px;
`

export const CustomizedLogoTypography = styled(Typography)`
color: #00ADB5;
font-family: sunflower;
font-size: 25px;
`

// export const CustomizedAvatar = styled(Avatar) <{ change: boolean }>`
// background-color: #00ADB5;
// height:${({ change }) => (change ? "50px" : "32px")};
// width:${({ change }) => (change ? "50px" : "32px")};
// `

export const CustomizedAvatar = styled(IconButton) <{ change: boolean | undefined }>`
background-color: #00ADB5;
height:${({ change }) => (change ? "50px" : "32px")};
width:${({ change }) => (change ? "50px" : "32px")};
:hover {
  background-color: #00c5cf;
}
`


export const CustomizedSearchIcon = styled(SearchIcon) <{ change: boolean | undefined }>`
height:${({ change }) => (change ? "30px" : "20px")};
width:${({ change }) => (change ? "30px" : "20px")};
color: white;
`
export const CustomizedMenuIcon = styled(MenuIcon)`
color: #717171;
`

export const CustomizedAccountCircleIcon = styled(AccountCircleIcon)`
color: #717171;
`

export const CustomizedTextfield = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-input': {
      padding: '0px',
    },
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    fontFamily: "Noto Sans KR",
    fontWeight: 400,
    fontSize: "15px",
  },
}));

export const CustomizedAutocomplete = styled(Autocomplete)`
autoCompleteResults: {
  paddingTop: '10px',
},
`

export const CustomizedWrapperDiv = styled.div`
display:flex;

`

export const CustomizedMenu = styled(Menu)`
margin-top:10px;
`

export const CustomizedGuestCountMenuItem = styled(MenuItem)`
:hover {
  background-color: transparent
}
justify-content: space-between;
`

export const CustomizedCalendarMenuItem = styled(MenuItem)`
:hover {
  background-color: transparent
}
`

export const CustomizedIconButton = styled(IconButton)`
:hover {
  background-color: transparent
}
`

export const CustomziedClearIcon = styled(ClearIcon)`
width: 15px;
height: 15px;
color:white;
`

export const CustomizedDeleteIconButton = styled(IconButton) <{ top: number, left: number }>`
background-color : #00adb5;
width: 30px;
height: 30px;
:hover {
  background-color: #00c5cf;
}
position: fixed;
top: ${props => props.top}px;
left: ${props => props.left}px;
`

export const CustomizedDeleteIconButtonInSearchField = styled(IconButton) <{ top: number, left: number }>`
background-color : #00adb5;
width: 30px;
height: 30px;
:hover {
  background-color: #00c5cf;
}
position: absolute;
top: ${props => props.top}px;
left: ${props => props.left}px;
z-index:1;
`

export const CustomizedDeleteIconButtonInGuestCount = styled(IconButton) <{ top: number, left: number }>`
background-color : #00adb5;
width: 30px;
height: 30px;
:hover {
  background-color: #00c5cf;
}
position:  fixed;
top: ${props => props.top}px;
left: ${props => props.left}px;
`