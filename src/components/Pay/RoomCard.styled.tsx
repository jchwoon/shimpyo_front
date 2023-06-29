import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { Card } from '@mui/material';


// export const CustomizedCard = styled.div`
// height: 200px;
// display: flex; 
// flex-direction: row; 
// box-shadow: none;
// position: absolute;
// align-items: center;
// border-radius: 10px;
// padding-left: 15px;
// background-color: white;
// top: 150px;
// `

// export const HotelImage = styled.img`
//   width: calc(100% - 20px);
//   height: 150px;
//   object-fit: cover;
//   border-radius: 20px 20px 20px 0px;
//   margin-left:20px;
// `;

export const CustomizedCard = styled(Card)`
height: 150px;
width: calc(100% - 50px);
display: flex; 
flex-direction: row; 
// box-shadow: none;
position: absolute;
align-items: center;
border-radius: 10px;
padding-left: 15px;
background-color: white;
transition: 0.3s ease;
// top:50px;
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
margin-left: 15px; 
`

export const CustomizedWrapperDiv = styled.div`
position:relative;
`

export const OptionWrapper = styled.div`
display: flex; 
flex-direction: column;
align-items: center; 
margin-left: 15px; 
margin-bottom: 10px;
`