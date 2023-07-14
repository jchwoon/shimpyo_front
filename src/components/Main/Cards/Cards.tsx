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

export default function Cards() {

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
                                onClick={() => navigate('/detail')}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        pt: '100%',
                                        borderRadius: 3
                                    }}
                                    image="https://source.unsplash.com/random?wallpapers"
                                />
                                <ToggleFavorite />
                                <CustomizedCardContent sx={{ flexGrow: 1, paddingLeft: "0px", paddingRight: "0px", paddingBottom: "0px" }}>
                                    <CustomizedTitleRowBox>
                                        <CustomizedTitleTypography fontFamily='Noto Sans KR'>
                                            Title
                                        </CustomizedTitleTypography>
                                        <CustomizedPercentageRowBox>
                                            <CustomizedThumbUpIcon />
                                            <CustomizedPercentageTypography>
                                                Like%
                                            </CustomizedPercentageTypography>
                                        </CustomizedPercentageRowBox>
                                    </CustomizedTitleRowBox>

                                    <CustomizedExplainTypography>
                                        Explaination
                                    </CustomizedExplainTypography>
                                    <CustomizedDateTypography>
                                        From when to when
                                    </CustomizedDateTypography>
                                    <CustomizedPricePerNightTypography>
                                        ₩ Price /night
                                    </CustomizedPricePerNightTypography>
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