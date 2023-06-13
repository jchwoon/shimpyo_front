import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, TextField, MenuItem } from '@mui/material';

export const CustomizedAppBar = styled(AppBar)`
background-color: #fff;
padding-left : 40px;
padding-right : 40px;
height:80px;
position: fixed;
display:flex;
direction: row;
justify-content: center;
`

export const CustomizedToolBar = styled(Toolbar)`
height: 80px;
justify-content: center;
`

export const CustomizedSearchButtonWrapperDiv = styled.div`
height:"50px";
padding-bottom:"0px";
`

export const CustomizedSearchButton = styled(Button)`
height: 50px;
display: flex;
justify-content: center; 
color: #000000;
background-color: #fff;
border-radius: 50px;
:hover {
  background-color:#fff;
}
padding-left: 0px;
padding-right: 10px;
`

export const CustomizedTypography = styled(Typography)`
font-family: Noto Sans KR;
font-size: 15px;
`

export const CustomizedDivider = styled(Divider)`
`

export const CustomizedAvatar = styled(Avatar)`
background-color: #00ADB5;
height:32px;
width:32px;
`

export const CustomizedSearchIcon = styled(SearchIcon)`
height:20px;
width:20px;
`

export const CustomizedCard = styled(Card)`
margin: 10px 10px 0px 10px;
padding: 15px;
border-radius: 15px;
`

export const CustomizedLastCard = styled(Card)`
margin: 10px 10px 10px 10px;
padding: 15px;
border-radius: 15px;
`

export const CustomziedClearIcon = styled(ClearIcon)`
width: 15px;
height: 15px;
color:white;
`

export const CustomizedDeleteIconButton = styled(IconButton)`
background-color : #00adb5;
width: 30px;
height: 30px;
:hover {
  background-color: #00c5cf;
`
export const CustomizedBeforeClickDiv = styled.div`
display:flex;
flex-direction: column;
`

export const CustomizedWhenBeforeClickDiv = styled.div`
display:flex;
justify-content: space-between;
`

export const CustomizedAfterClickDiv = styled.div`
display:flex;
flex-direction: column;
height:300px;
`

export const CustomizedCheckInOutAfterClickDiv = styled.div`
display:flex;
flex-direction: column;
`

export const CustomizedAfterWhenClickDiv = styled.div`
display:flex;
justify-content: space-between;
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

export const CustomizedGuestCountDiv = styled(MenuItem)`
:hover {
  background-color: transparent
}
justify-content: space-between;
padding-left: 0px;
`