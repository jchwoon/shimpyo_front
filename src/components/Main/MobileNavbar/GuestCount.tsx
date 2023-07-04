import { CustomizedGuestCountDiv } from "./MobileNavbar.style"
import { IconButton, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { AdultGuest, ChildGuest, InfantGuest } from "../../../recoil/navBarAtoms";

export function GuestCountAdult() {
    const [adultGuest, setAdultGuest] = useRecoilState(AdultGuest)
    const handleAddClick = () => {
        setAdultGuest((prevGuest) => prevGuest + 1);
    };

    const handleRemoveClick = () => {
        setAdultGuest((prevGuest) => prevGuest - 1);
    };

    return (
        <CustomizedGuestCountDiv disableRipple>
            <Typography fontFamily='Noto Sans KR'>
                성인
            </Typography>
            <div>
                <IconButton onClick={handleRemoveClick} disabled={adultGuest > 0 ? false : true}>
                    <RemoveIcon />
                </IconButton>
                {adultGuest}
                <IconButton onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            </div>
        </CustomizedGuestCountDiv>
    )
}

export function GuestCountChild() {

    const [childGuest, setChildGuest] = useRecoilState(ChildGuest)
    const handleAddClick = () => {
        setChildGuest((prevGuest) => prevGuest + 1);
    };

    const handleRemoveClick = () => {
        setChildGuest((prevGuest) => prevGuest - 1);
    };

    return (
        <CustomizedGuestCountDiv disableRipple>
            <Typography fontFamily='Noto Sans KR'>
                어린이
            </Typography>
            <div>
                <IconButton onClick={handleRemoveClick} disabled={childGuest > 0 ? false : true}>
                    <RemoveIcon />
                </IconButton>
                {childGuest}
                <IconButton onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            </div>
        </CustomizedGuestCountDiv>
    )
}

export function GuestCountInfant() {

    const [infantGuest, setInfantGuest] = useRecoilState(InfantGuest)
    const handleAddClick = () => {
        setInfantGuest((prevGuest) => prevGuest + 1);
    };

    const handleRemoveClick = () => {
        setInfantGuest((prevGuest) => prevGuest - 1);
    };

    return (
        <CustomizedGuestCountDiv disableRipple>
            <Typography fontFamily='Noto Sans KR'>
                유아
            </Typography>
            <div>
                <IconButton onClick={handleRemoveClick} disabled={infantGuest > 0 ? false : true}>
                    <RemoveIcon />
                </IconButton>
                {infantGuest}
                <IconButton onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            </div>
        </CustomizedGuestCountDiv>
    )
}