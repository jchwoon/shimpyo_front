import {
    CustomizedCard,
    CustomizedLastCard,
    CustomizedTypography,
    CustomizedBeforeClickDiv,
    CustomizedWhenBeforeClickDiv,
    CustomizedAfterClickDiv,
    CustomizedCheckInOutAfterClickDiv,
    CustomizedAfterWhenClickDiv
} from "./MobileNavbar.style"
import { useState } from "react"
import GoogleMaps from "./MuiSearchField";
import { Calendar } from "./Calendar";

import { useRecoilState, useRecoilValue } from "recoil";
import { Height, Display, Change, AdultGuest, ChildGuest, InfantGuest, FirstPickedDate, SecondPickedDate } from "../../recoil/atoms";

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from "./GuestCount";
import { Divider } from "@mui/material";

export default function DrawerContent() {

    const [GoogleMapsPlaceholder, setGoogleMapsPlaceholder] = useState('')
    const [placeholderChanged, setPlaceholderChanged] = useState(false)
    const resetFunctionInSearchField = () => {
        setGoogleMapsPlaceholder('')
        setPlaceholderChanged(false)
    }
    const [activeCard, setActiveCard] = useState('')
    const handleCardClick = (cardId: string) => {
        setActiveCard(cardId);
    }

    const [firstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate);
    const [secondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate);

    return (
        <>
            <CustomizedCard onClick={() => handleCardClick('card1')} className="card1" >
                {activeCard === "card1" ?
                    <CustomizedAfterClickDiv>
                        <CustomizedTypography fontWeight="500">
                            여행지
                        </CustomizedTypography>
                        <GoogleMaps placeholder={GoogleMapsPlaceholder} setPlaceholder={setGoogleMapsPlaceholder} setPlaceholderChanged={setPlaceholderChanged} />
                    </CustomizedAfterClickDiv>
                    :
                    <CustomizedBeforeClickDiv>
                        <CustomizedTypography fontWeight="500">
                            여행지
                        </CustomizedTypography>
                        <CustomizedTypography fontWeight="300" color="#a2a2a2">
                            여행지 검색
                        </CustomizedTypography>
                    </CustomizedBeforeClickDiv>
                }
            </CustomizedCard>
            <CustomizedCard onClick={() => handleCardClick('card2')} className="card2">
                {activeCard === "card2" ?
                    <CustomizedAfterWhenClickDiv>
                        <CustomizedCheckInOutAfterClickDiv>
                            <CustomizedTypography fontWeight="500">
                                체크인
                            </CustomizedTypography>
                            <CustomizedTypography fontWeight="300" color="#a2a2a2" sx={{ minWidth: "60px", marginBottom: "10px" }}>
                                {firstPickedDate ? firstPickedDate : "날짜 추가"}
                            </CustomizedTypography>
                            <CustomizedTypography fontWeight="500">
                                체크아웃
                            </CustomizedTypography>
                            <CustomizedTypography fontWeight="300" color="#a2a2a2" sx={{ minWidth: "60px" }}>
                                {secondPickedDate ? secondPickedDate : "날짜 추가"}
                            </CustomizedTypography>
                        </CustomizedCheckInOutAfterClickDiv>
                        <Calendar />
                        <div />
                    </CustomizedAfterWhenClickDiv>

                    :
                    <CustomizedBeforeClickDiv>
                        <CustomizedTypography fontWeight="500">
                            체크인
                        </CustomizedTypography>
                        <CustomizedTypography fontWeight="300" color="#a2a2a2">
                            날짜 추가
                        </CustomizedTypography>
                    </CustomizedBeforeClickDiv>
                }

            </CustomizedCard>
            <CustomizedLastCard onClick={() => handleCardClick('card3')} className="card3">
                {activeCard === "card3" ?
                    <CustomizedBeforeClickDiv>
                        <CustomizedTypography fontWeight="500">
                            여행자
                        </CustomizedTypography>
                        <CustomizedTypography fontWeight="300" color="#a2a2a2">
                            게스트 추가
                        </CustomizedTypography>
                        <GuestCountAdult />
                        <Divider variant="fullWidth" />
                        <GuestCountChild />
                        <Divider variant="fullWidth" />
                        <GuestCountInfant />
                    </CustomizedBeforeClickDiv>
                    :
                    <CustomizedBeforeClickDiv>
                        <CustomizedTypography fontWeight="500">
                            여행자
                        </CustomizedTypography>
                        <CustomizedTypography fontWeight="300" color="#a2a2a2">
                            게스트 추가
                        </CustomizedTypography>
                    </CustomizedBeforeClickDiv>
                }
            </CustomizedLastCard>
        </>
    )
}