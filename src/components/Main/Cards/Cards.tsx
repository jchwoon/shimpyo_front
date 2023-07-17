import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {
    CustomizedCard, CustomizedDarkDiv, CustomizedDateTypography, CustomizedExplainTypography, CustomizedPercentageRowBox, CustomizedPercentageTypography, CustomizedPricePerNightTypography,
    CustomizedThumbUpIcon, CustomizedTitleRowBox, CustomizedTitleTypography, cards, MainCustomizedCard
} from "./Cards.styled"
import ToggleFavorite from './ToggleFavorite';
import { useRecoilState } from "recoil";
import { Height, Display, Change } from '../../../recoil/navBarAtoms';

import useHttpRequest from '../../../hooks/useHttpRequest';
import { MAIN_PAGE_HOME_LIST_API_PATH } from '../../../constants/api/homeListApi'

import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import { Typography } from '@mui/material';

import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from 'react-icons/hi'

interface CardProps {
    cards: Array<any>
}

export default function Cards({ cards }: CardProps) {

    const [appbarheight, setAppBarHeight] = useRecoilState(Height);
    const [customDisplay, setCustomDisplay] = useRecoilState(Display);
    const [change, setChange] = useRecoilState(Change);
    const handleClick = () => {
        setAppBarHeight("80px")
        setCustomDisplay(false)
        setChange(false);
    }
    const navigate = useNavigate();



    return (
        <>
            <Container sx={{ paddingTop: 13 }} maxWidth="xl">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
                            <MainCustomizedCard
                                onClick={() => navigate(`/detail/${card.houseId}`)}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        pt: '100%',
                                        borderRadius: 3
                                    }}
                                    image={card.houseImages[0]}
                                />
                                <ToggleFavorite />
                                <CustomizedCardContent sx={{ flexGrow: 1, paddingLeft: "0px", paddingRight: "0px", paddingBottom: "0px" }}>
                                    <CustomizedTitleRowBox>
                                        <CustomizedTitleTypography fontFamily='Noto Sans KR'>
                                            {card.name}
                                        </CustomizedTitleTypography>
                                        <CustomizedPercentageRowBox>
                                            <HiOutlineEmojiHappy style={{ color: "#00adb5", height: "20px", width: "20px" }} />
                                            <CustomizedPercentageTypography color="#00adb5">
                                                Like%
                                            </CustomizedPercentageTypography>
                                        </CustomizedPercentageRowBox>
                                    </CustomizedTitleRowBox>
                                    <Description>
                                        {card.contents}
                                    </Description>
                                    <div style={{ display: "flex", justifyContent: "row", alignItems: "flex-end" }}>
                                        <CustomizedPricePerNightTypography>
                                            ₩ {card.price.toLocaleString()}
                                        </CustomizedPricePerNightTypography>
                                        <Typography fontFamily='Noto Sans KR' fontWeight="300" fontSize="12px">
                                            /박
                                        </Typography>
                                    </div>
                                </CustomizedCardContent>
                            </MainCustomizedCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <CustomizedDarkDiv onClick={handleClick} customDisplay={customDisplay} />
        </>
    )
}

const CustomizedCardContent = styled(CardContent)`
padding-left:0px;
padding-right:0px;
:last-child{
    padding-bottom:0px;
}

`

const Description = styled.div`
font-family:Noto Sans KR;
font-size: 12px;
font-weight:300;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
word-break: break-all;
overflow: hidden;
text-overflow: ellipsis;
`;