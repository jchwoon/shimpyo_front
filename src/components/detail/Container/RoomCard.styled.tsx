import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';


export const CustomizedCard = styled.div<{ active: boolean }>`
height: 100%;
display: flex; 
flex-direction: row; 
box-shadow: none;
position: relative;
align-items: center;
border-radius: 10px;
padding-left: 15px;
transition: 0.2s all ease;
${({ active }) =>
    active &&
    `
    box-shadow:rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    padding-left: 13px;
  `}
`

export const CustomizedLogoTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
`

export const CustomizedTitleTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
`

export const CustomizedPricePerNightTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
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



export const CustomizedTitleRowBox = styled(Box)`
display: flex;
flex-direction: row;
// justify-content: space-between;
align-items: center;
`

export const CustomizedWrapperDiv = styled.div`
position:relative;
`

