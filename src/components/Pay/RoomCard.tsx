import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
    CustomizedCard, CustomizedPricePerNightTypography,
    CustomizedTitleRowBox, CustomizedTitleTypography, OptionWrapper
} from "./RoomCard.styled"

import { LuBedDouble } from 'react-icons/lu'
import { MdOutlineBedroomParent } from 'react-icons/md'
import { LuShowerHead } from 'react-icons/lu'
import { BsPersonPlus } from 'react-icons/bs'
import { Typography } from '@mui/material';

interface RommCardProps {
    name: string;
    doubleBed: number;
    bedroom: number;
    shower: number;
    person: number;
    price: number;
    isHovered: boolean
}


export const RoomCard: React.FC<RommCardProps> = ({ name, doubleBed, bedroom, shower, person, price, isHovered }) => {
    return (
        <CustomizedCard sx={{ top: isHovered ? "120px" : "50px" }}>
            <CardMedia
                component="div"
                sx={{
                    borderRadius: 3,
                    width: "150px",
                    height: "120px",
                }}
                image="https://source.unsplash.com/random?wallpapers"
            />
            <CardContent sx={{ width: "100%" }}>
                <CustomizedTitleRowBox>
                    <CustomizedTitleTypography fontFamily='Noto Sans KR'>
                        {name}
                    </CustomizedTitleTypography>

                </CustomizedTitleRowBox>

                <div style={{ display: "flex", flexDirection: "row", marginTop: "15px", marginBottom: "10px", flexWrap: "wrap" }}>
                    {bedroom ?
                        <OptionWrapper>
                            <MdOutlineBedroomParent size={25} />
                            <Typography fontFamily='Noto Sans KR' fontSize="5px">침실 {bedroom}개</Typography>
                        </OptionWrapper>
                        : null}
                    {doubleBed ?
                        <OptionWrapper>
                            <LuBedDouble size={25} />
                            <Typography fontFamily='Noto Sans KR' fontSize="5px">침대 {doubleBed}개</Typography>
                        </OptionWrapper>
                        : null}
                    {shower ?
                        <OptionWrapper>

                            <LuShowerHead size={25} />

                            <Typography fontFamily='Noto Sans KR' fontSize="5px">샤워실 {shower}</Typography>
                        </OptionWrapper>
                        : null}
                    {person ?
                        <OptionWrapper>

                            <BsPersonPlus size={25} />

                            <Typography fontFamily='Noto Sans KR' fontSize="5px">최대인원 {person}명</Typography>
                        </OptionWrapper>
                        : null}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", width: "100%" }}>
                    <CustomizedPricePerNightTypography fontFamily='Noto Sans KR'>
                        ₩ {price.toLocaleString()}
                    </CustomizedPricePerNightTypography>
                    <Typography fontFamily='Noto Sans KR' fontWeight="300" fontSize="12px">
                        /박
                    </Typography>
                </div>
            </CardContent>
        </CustomizedCard >

    )
}