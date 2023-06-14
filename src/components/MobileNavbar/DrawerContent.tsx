import {
    CustomizedCard1,
    CustomizedCard2,
    CustomizedCard3,
    CustomizedTypography,
    CustomizedBeforeClickDiv,
    CustomizedAfterClickDiv,
    CustomizedCheckInOutAfterClickDiv,
    CustomizedAfterWhenClickDiv,
    CustomizedDeleteIconButton,
    CustomizedClearIcon,
    CustomizedFab
} from "./MobileNavbar.style"
import { useState } from "react"
import GoogleMaps from "./MuiSearchField";
import { Calendar } from "./Calendar";
import React from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import {
    Height,
    Display,
    Change,
    AdultGuest,
    ChildGuest,
    InfantGuest,
    FirstPickedDate,
    SecondPickedDate,
    googleMapsPlaceholder,
    PlaceholderChanged
} from "../../recoil/atoms";

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from "./GuestCount";
import { Divider, Collapse } from "@mui/material";
import {
    useDatePickReset,
} from '@bcad1591/react-date-picker';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

interface DrawerContentProps {
    activeCard: string,
    setActiveCard: (value: string) => void;
    open: boolean;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ activeCard, setActiveCard, open }) => {

    const [GoogleMapsPlaceholder, setGoogleMapsPlaceholder] = useRecoilState(googleMapsPlaceholder)
    const [placeholderChanged, setPlaceholderChanged] = useRecoilState(PlaceholderChanged)
    const resetFunctionInSearchField = () => {
        setGoogleMapsPlaceholder('')
        setPlaceholderChanged(false)
    }
    // const [activeCard, setActiveCard] = useState('')
    const handleCardClick = (cardId: string) => {
        setActiveCard(cardId);
    }

    const [firstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate);
    const [secondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate);

    const reset = useDatePickReset();
    const resetFunction = () => {
        reset();
        setFirstPickedDate(null);
        setSecondPickedDate(null)
    }


    const [AdultGuestNumber, setAdultGuestNumber] = useRecoilState(AdultGuest);
    const [ChildGuestNumber, setChildGuestNumber] = useRecoilState(ChildGuest);
    const [InfantGuestNumber, setInfantGuestNumber] = useRecoilState(InfantGuest);

    const TotalGuestNumber = AdultGuestNumber + ChildGuestNumber
    if (InfantGuestNumber > 0 && AdultGuestNumber === 0) {
        setAdultGuestNumber(prevValue => prevValue + 1)
    }
    const TotalGuestNumberCount = InfantGuestNumber === 0 ? `게스트 ${TotalGuestNumber}명` : `게스트 ${TotalGuestNumber} 명, 유아 ${InfantGuestNumber}명 `

    const guestCountReset = () => {
        setAdultGuestNumber(0);
        setChildGuestNumber(0);
        setInfantGuestNumber(0);
    }


    return (
        <>
            <Collapse in={activeCard === "card1"} collapsedSize={"90px"}>
                <div style={{ position: "relative" }}>
                    {activeCard === "card1" ?
                        placeholderChanged ?
                            <CustomizedDeleteIconButton top={-10} left={0} onClick={resetFunctionInSearchField} >
                                <CustomizedClearIcon />
                            </CustomizedDeleteIconButton>
                            :
                            null
                        :
                        null
                    }
                    <CustomizedCard1 onClick={() => handleCardClick('card1')} className="card1" activeCard={activeCard} >
                        {activeCard === "card1" ?
                            <CustomizedAfterClickDiv style={{ position: "relative" }}>
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
                                <GoogleMaps placeholder={GoogleMapsPlaceholder} setPlaceholder={setGoogleMapsPlaceholder} setPlaceholderChanged={setPlaceholderChanged} />
                            </CustomizedBeforeClickDiv>
                        }
                    </CustomizedCard1>
                </div>
            </Collapse>
            <Collapse in={activeCard === "card2"} collapsedSize={"90px"}>
                <div style={{ position: "relative" }}>
                    {activeCard === "card2" ?
                        firstPickedDate ?
                            <CustomizedDeleteIconButton top={-10} left={0} onClick={resetFunction}>
                                <CustomizedClearIcon />
                            </CustomizedDeleteIconButton>
                            :
                            null
                        :
                        null
                    }
                    <CustomizedCard2 onClick={() => handleCardClick('card2')} className="card2">
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
                    </CustomizedCard2>
                </div>
            </Collapse>
            <Collapse in={activeCard === "card3"} collapsedSize={"90px"}>
                <div style={{ position: "relative" }}>
                    {activeCard === "card3" ?
                        TotalGuestNumber > 0 ?
                            <CustomizedDeleteIconButton top={-10} left={0} onClick={guestCountReset}>
                                <CustomizedClearIcon />
                            </CustomizedDeleteIconButton>
                            :
                            null
                        :
                        null
                    }
                    <CustomizedCard3 onClick={() => handleCardClick('card3')} className="card3">
                        {activeCard === "card3" ?
                            <CustomizedBeforeClickDiv>
                                <CustomizedTypography fontWeight="500">
                                    여행자
                                </CustomizedTypography>
                                <CustomizedTypography fontWeight="300" color="#a2a2a2">
                                    {TotalGuestNumber > 0 ? TotalGuestNumberCount : "게스트 추가"}
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
                                    {TotalGuestNumber > 0 ? TotalGuestNumberCount : "게스트 추가"}
                                </CustomizedTypography>
                            </CustomizedBeforeClickDiv>
                        }
                    </CustomizedCard3 >
                </div>
            </Collapse>
            <CustomizedFab color="primary" aria-label="add">
                <SearchIcon />
            </CustomizedFab>

        </>
    )
}