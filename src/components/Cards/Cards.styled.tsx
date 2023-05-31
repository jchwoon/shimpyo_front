import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

import { Box } from '@mui/material';

export const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

export const CustomizedThumbsUpDownIcon = styled(ThumbsUpDownIcon)`
color: #000000;
height: 20px
`

export const CustomizedFavoriteBorderIcon = styled(FavoriteBorderIcon)`
color: rgba(255,255,255, 0.5);
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
`

export const CustomizedPercentageTypography = styled(Typography)`
font-size: 15px;
font-weight: 500;
margin-left: 5px;
`

export const CustomizedTitleRowBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-between;
`

export const CustomizedPercentageRowBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-between;
`
