import { CustomizedFavoriteIcon, CustomizedFavoriteBorderIcon, CustomizedIconButton } from "./Cards.styled"
import { useState } from "react"

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