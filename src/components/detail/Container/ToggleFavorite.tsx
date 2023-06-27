import { useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';

const CustomizedFavoriteIcon = styled(FavoriteIcon)`
color: #00adb580;
height: 30px;
`

const CustomizedFavoriteBorderIcon = styled(FavoriteBorderIcon)`
color: #c5c5c5;
height: 30px;
`

export const CustomizedIconButton = styled(IconButton)`
top: 20px;
right: 20px;
height: 35px;
width: 35px;
:hover {
    background-color: unset;
  }
.MuiTouchRipple-child {
  background-color:#00adb5;
}
`

const ToggleFavorite = () => {
    const [favorite, setFavorite] = useState(false);

    const handleClick = () => {
        setFavorite((prevState) => !prevState)
    };
    return (
        <CustomizedIconButton onClick={handleClick} >
            {favorite ? <CustomizedFavoriteIcon /> : <CustomizedFavoriteBorderIcon />}
        </CustomizedIconButton >
    )
}

export default ToggleFavorite

