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

import { useEffect, useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom';

import styled from '@emotion/styled';

import { Typography } from '@mui/material';

import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from 'react-icons/hi'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';



interface CardProps {
    cards: Array<any>;
    loading: boolean;
}

export default function Cards({ cards, loading }: CardProps) {

    const [appbarheight, setAppBarHeight] = useRecoilState(Height);
    const [customDisplay, setCustomDisplay] = useRecoilState(Display);
    const [change, setChange] = useRecoilState(Change);
    const handleClick = () => {
        setAppBarHeight("80px")
        setCustomDisplay(false)
        setChange(false);
    }
    const navigate = useNavigate();

    function houseType(val: string) {
        let answer = ''
        switch (val) {
            case "MOTEL":
                answer = "모텔";
                break;
            case "PENSION":
                answer = "펜션";
                break;
            case "HOTEL":
                answer = "호텔";
                break;
            case "GUEST":
                answer = "게스트 하우스";
                break;
        }
        return answer
    }

    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const location = useLocation();
    const isSearchPage = location.pathname.includes('/search/');

    return (
        <>
            <Container sx={{ paddingTop: 13 }} maxWidth="xl">
                <Grid container spacing={4}>
                    {cards.length > 0 ? cards.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <MainCustomizedCard
                                onClick={
                                    () => {
                                        if (card.soldout) return
                                        navigate(`/detail/${card.houseId}`)
                                    }
                                }
                            >
                                <div style={{ position: "relative" }}>
                                    {card.soldout && <HoverDiv>
                                        <Typography fontFamily="Noto Sans KR" color="white" fontSize="15px" fontWeight="500">예약이 마감되었습니다</Typography>
                                    </HoverDiv>}
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            pt: '100%',
                                            borderRadius: 3
                                        }}
                                        image={card.houseImages[0]}
                                    />
                                </div>
                                <ToggleFavorite houseId={card.houseId} />
                                <CustomizedCardContent sx={{ flexGrow: 1, paddingLeft: "0px", paddingRight: "0px", paddingBottom: "0px" }}>
                                    <CustomizedTitleRowBox>
                                        <CustomizedTitleTypography fontFamily='Noto Sans KR'>
                                            {card.name}
                                        </CustomizedTitleTypography>
                                        {card.ratio > 0 ?
                                            <CustomizedPercentageRowBox>
                                                <HiOutlineEmojiHappy style={{ color: "#00adb5", height: "20px", width: "20px" }} />
                                                <CustomizedPercentageTypography color="#00adb5">
                                                    {Number(card.ratio).toFixed(1)}
                                                </CustomizedPercentageTypography>
                                            </CustomizedPercentageRowBox> : null}
                                    </CustomizedTitleRowBox>
                                    <Typography fontFamily='Noto Sans KR' fontWeight="300" fontSize="13px" color="#8d8d8d" sx={{ marginBottom: "5px" }}>
                                        {card.sido + " " + card.sigungu + "의 " + houseType(card.type)}
                                    </Typography>
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
                    ))
                        :
                        isSearchPage
                            ?
                            !loading ?
                                <div style={{ width: "100%", height: windowHeight * 0.8, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", width: "80%" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", height: "100%", marginRight: "10px" }}>
                                            <FaQuoteLeft size={10} color='#b3b3b3' />
                                        </div>
                                        <div>
                                            <Typography fontFamily='Gowun Batang' fontSize="30px">좋은 여행자는 고정된 계획이 없고, 도착을 목적으로 가지지 않는다.</Typography>
                                            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                                <Typography noWrap fontFamily='Gowun Batang' fontSize="20px">노자</Typography>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", marginLeft: "10px" }}>
                                            <FaQuoteRight size={10} color='#b3b3b3' />
                                        </div>

                                    </div>
                                    <StyledImg src="/images/paperplane.gif" alt="paper plane" style={{ width: "100px", marginBottom: "30px" }} />
                                    <Typography fontFamily='Gowun Batang' fontSize="15px">원하시는 여행조건에 대한 결과는 없었지만</Typography>
                                    <Typography fontFamily='Gowun Batang' fontSize="15px" style={{ marginBottom: "8px" }}>당신의 여행은 멈추지 않습니다.</Typography>
                                    <Typography fontFamily='Gowun Batang' fontSize="15px" fontWeight="1000" color="#00adb5">새로운 여행들을 찾아 떠나보세요.</Typography>
                                </div>
                                : null
                            : null
                    }
                </Grid>
            </Container >
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

const HoverDiv = styled.div`
  z-index: 2;
  position: absolute;
  width:100%;
  height:100%;
  transition: 0.2s all ease;
  opacity:0.5;
  background-color: rgba(0, 0, 0, 0.5);
  cursor:pointer;
  border-radius: 12px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const StyledImg = styled.img`

`