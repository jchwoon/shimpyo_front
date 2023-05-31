import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {
    CustomizedCard, CustomizedDateTypography, CustomizedExplainTypography, CustomizedPercentageRowBox, CustomizedPercentageTypography, CustomizedPricePerNightTypography,
    CustomizedThumbsUpDownIcon, CustomizedTitleRowBox, CustomizedTitleTypography, cards, CustomizedFavoriteBorderIcon, CustomizedIconButton
} from "./Cards.styled"

export default function Cards() {
    return (
        <Container sx={{ py: 3 }} maxWidth="xl">
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
                            <CustomizedIconButton disableRipple>
                                <CustomizedFavoriteBorderIcon />
                            </CustomizedIconButton>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <CustomizedTitleRowBox>
                                    <CustomizedTitleTypography fontFamily='Noto Sans KR'>
                                        Title
                                    </CustomizedTitleTypography>
                                    <CustomizedPercentageRowBox>
                                        <CustomizedThumbsUpDownIcon />
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
    )
}