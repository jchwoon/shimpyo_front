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
import React from "react";
import { Calendar } from "../MobileCalendar/Calendar";
import moment from "moment";
import 'moment/locale/ko'

import { useRecoilState, useRecoilValue } from "recoil";
import {
    Height,
    Display,
    Change,
    FirstPickedDate,
    SecondPickedDate,
    googleMapsPlaceholder,
    PlaceholderChanged,
    objectPlaceholder,
    AdultGuest,
    ChildGuest,
    InfantGuest
} from "../../../recoil/navBarAtoms";
import { GuestCountAdult, GuestCountChild, GuestCountInfant } from "./GuestCount";
import { Divider, Collapse } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface DrawerContentProps {
    activecard: string,
    setActiveCard: (value: string) => void;
    open: boolean;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ activecard, setActiveCard, open }) => {

    const [GoogleMapsPlaceholder, setGoogleMapsPlaceholder] = useRecoilState(googleMapsPlaceholder)
    const [placeholderChanged, setPlaceholderChanged] = useRecoilState(PlaceholderChanged)
    const [ObjectPlaceholder, setObjectPlaceholder] = useRecoilState(objectPlaceholder);
    const [textfieldInputValue, setTextfieldInputValue] = useState(false)
    const resetFunctionInSearchField = () => {
        setObjectPlaceholder(
            {
                description: "",
                structured_formatting: {
                    main_text: "",
                    secondary_text: "",
                    main_text_matched_substrings: []
                }
            }
        )
        setPlaceholderChanged(false)
        setTextfieldInputValue(false)
    }
    // const [activeCard, setActiveCard] = useState('')
    const handleCardClick = (cardId: string) => {
        setActiveCard(cardId);
    }

    const [firstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate);
    const [secondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate);

    const resetFunction = () => {
        setFirstPickedDate('');
        setSecondPickedDate('')
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
            <Collapse in={activecard === "card1"} collapsedSize={"90px"}>
                <div style={{ position: "relative" }}>
                    {activecard === "card1" ?
                        ObjectPlaceholder.description !== ''
                            ?
                            <CustomizedDeleteIconButton top={-10} left={0} onClick={resetFunctionInSearchField} >
                                <CustomizedClearIcon />
                            </CustomizedDeleteIconButton>
                            :
                            null
                        :
                        null
                    }
                    <CustomizedCard1 onClick={() => handleCardClick('card1')} className="card1" activecard={activecard} >
                        {activecard === "card1" ?
                            <CustomizedAfterClickDiv style={{ position: "relative" }}>
                                <CustomizedTypography fontWeight="500">
                                    여행지
                                </CustomizedTypography>
                                <GoogleMaps
                                    placeholder={GoogleMapsPlaceholder}
                                    setPlaceholder={setGoogleMapsPlaceholder}
                                    setPlaceholderChanged={setPlaceholderChanged}
                                    textfieldInputValue={textfieldInputValue}
                                    setTextfieldInputValue={setTextfieldInputValue}
                                    ObjectPlaceholder={ObjectPlaceholder}
                                    setObjectPlaceholder={setObjectPlaceholder}
                                />
                            </CustomizedAfterClickDiv>
                            :
                            <CustomizedBeforeClickDiv>
                                <CustomizedTypography fontWeight="500">
                                    여행지
                                </CustomizedTypography>
                                <GoogleMaps
                                    placeholder={GoogleMapsPlaceholder}
                                    setPlaceholder={setGoogleMapsPlaceholder}
                                    setPlaceholderChanged={setPlaceholderChanged}
                                    textfieldInputValue={textfieldInputValue}
                                    setTextfieldInputValue={setTextfieldInputValue}
                                    ObjectPlaceholder={ObjectPlaceholder}
                                    setObjectPlaceholder={setObjectPlaceholder}
                                />
                            </CustomizedBeforeClickDiv>
                        }
                    </CustomizedCard1>
                </div>
            </Collapse>
            <Collapse in={activecard === "card2"} collapsedSize={"90px"}>
                <div style={{ position: "relative" }}>
                    {activecard === "card2" ?
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
                        {activecard === "card2" ?
                            <CustomizedAfterWhenClickDiv>
                                <CustomizedCheckInOutAfterClickDiv>
                                    <CustomizedTypography fontWeight="500">
                                        체크인
                                    </CustomizedTypography>
                                    <CustomizedTypography fontWeight="300" color="#a2a2a2" sx={{ minWidth: "60px", marginBottom: "10px" }}>
                                        {firstPickedDate ?
                                            moment(firstPickedDate).format("M월 D일") : "날짜 추가"}
                                    </CustomizedTypography>
                                    <CustomizedTypography fontWeight="500">
                                        체크아웃
                                    </CustomizedTypography>
                                    <CustomizedTypography fontWeight="300" color="#a2a2a2" sx={{ minWidth: "60px" }}>
                                        {secondPickedDate ? moment(secondPickedDate).format("M월 D일") : "날짜 추가"}
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
            <Collapse in={activecard === "card3"} collapsedSize={"90px"}>
                <div style={{ position: "relative" }}>
                    {activecard === "card3" ?
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
                        {activecard === "card3" ?
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