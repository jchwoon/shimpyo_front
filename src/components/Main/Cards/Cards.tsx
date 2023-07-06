import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {
    CustomizedCard, CustomizedDarkDiv, CustomizedDateTypography, CustomizedExplainTypography, CustomizedPercentageRowBox, CustomizedPercentageTypography, CustomizedPricePerNightTypography,
    CustomizedThumbUpIcon, CustomizedTitleRowBox, CustomizedTitleTypography, cards
} from "./Cards.styled"
import ToggleFavorite from './ToggleFavorite';
import { useRecoilState } from "recoil";
import { Height, Display, Change } from '../../../recoil/navBarAtoms';

import useHttpRequest from '../../../hooks/useHttpRequest';
import { MAIN_PAGE_HOME_LIST_API_PATH } from '../../../constants/api/homeListApi'

import { useEffect } from 'react'

export default function Cards() {

    const [appbarheight, setAppBarHeight] = useRecoilState(Height);
    const [customDisplay, setCustomDisplay] = useRecoilState(Display);
    const [change, setChange] = useRecoilState(Change);
    const handleClick = () => {
        setAppBarHeight("80px")
        setCustomDisplay(false)
        setChange(false);
    }

    interface ResultData {
        houseList: JSON;
    }

    const { isLoading, responseData, sendRequest } = useHttpRequest<ResultData>();

    // useEffect(() => {
    //     sendRequest({
    //         url: `${MAIN_PAGE_HOME_LIST_API_PATH}`,
    //         method: 'GET',
    //     });
    // }, [])

    // console.log("responseData:", responseData)

    return (
        <>
            <Container sx={{ py: 13 }} maxWidth="xl">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
                            <CustomizedCard
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: "none", borderRadius: 0 }}
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
                                <CardContent sx={{ flexGrow: 1 }}>
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
                                </CardContent>
                            </CustomizedCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <CustomizedDarkDiv onClick={handleClick} customDisplay={customDisplay} />
        </>
    )
}