import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box } from '@mui/material';

export const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const MainCustomizedCard = styled(Card)`
height: 100%; 
display: flex; 
flex-direction: column; 
position: relative;
border-radius:10px;
padding:10px;
box-shadow:none;
cursor: pointer;
&:hover {
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
}
`

export const CustomizedCard = styled(Card)`
height: 100%; 
display: flex; 
flexDirection: column; 
boxShadow: none;
position: relative;
`

export const CustomizedLogoTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
`

export const CustomizedTitleTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
`

export const CustomizedExplainTypography = styled(Typography)`
font-size: 13px;
font-weight: 500;
font-color: #717171;
`

export const CustomizedDateTypography = styled(Typography)`
font-size: 13px;
font-weight: 500;
font-color: #717171;
`

export const CustomizedPricePerNightTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
`

export const CustomizedThumbUpIcon = styled(ThumbUpIcon)`
color: #00adb5;
height: 20px
`

export const CustomizedFavoriteBorderIcon = styled(FavoriteBorderIcon)`
color: rgba(255,255,255, 0.5);
height: 30px;
`

export const CustomizedFavoriteIcon = styled(FavoriteIcon)`
// color: rgba(255,255,255, 0.5);
color: #00adb580;
height: 30px;
`

export const CustomizedIconButton = styled(IconButton)`
position: absolute;
top: 20px;
right: 20px;
height: 35px;
width: 35px;
:hover {
    background-color: unset;
  }
.MuiTouchRipple-child {
  // background-color: rgba(255,255,255, 0.5);
  background-color:#00adb5;
}
`

export const CustomizedPercentageTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
margin-left: 3px;
`

export const CustomizedTitleRowBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items:center;
`

export const CustomizedPercentageRowBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-between;
`
export const CustomizedWrapperDiv = styled.div`
position:relative;
`

export const CustomizedDarkDiv = styled.div < { customDisplay: boolean }> `
height: 100%;
width: 100%;
background-color: rgba(0,0,0,0.5);
position: fixed;
top:0px;
left:0px;
visibility:${({ customDisplay }) => (customDisplay ? "visible" : "hidden")};
transition: 0.2s ease;
`