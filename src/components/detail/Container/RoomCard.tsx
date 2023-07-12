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
import { BsPerson, BsPersonPlus } from 'react-icons/bs'
import { Typography } from '@mui/material';

import { useRecoilState } from "recoil";
import { activeRoomPrice, activeRoomName } from '../../../recoil/detailPageAtoms';
import { useEffect } from 'react';
import moment from "moment";
import 'moment/locale/ko'


interface RommCardProps {
    image: Array<string>;
    name: string;
    doubleBed: number;
    bedroom: number;
    shower: number;
    minPerson: number;
    maxPerson: number;
    checkInTime: string;
    checkOutTime: string;
    price: number;
    onClick: () => void;
    active: boolean;
}


export const RoomCard: React.FC<RommCardProps> = ({ image, name, doubleBed, bedroom, shower, minPerson, maxPerson, checkInTime, checkOutTime, price, onClick, active }) => {

    const [roomPrice, setRoomPrice] = useRecoilState(activeRoomPrice);
    const [roomName, setRoomName] = useRecoilState(activeRoomName);
    useEffect(() => {
        if (active) {
            setRoomPrice(price);
            setRoomName(name);
        }
    }, [active]);

    const momentCheckInTime = moment(checkInTime, "HH:mm:ss").format("hh:mm A")


    return (
        <div>
            <CustomizedCard onClick={onClick}
                active={active}
                className={active ? "activeRoomCard" : ""}>
                <CardMedia
                    component="div"
                    sx={{
                        borderRadius: 3,
                        width: "150px",
                        height: "120px",
                    }}
                    image={image[0]}
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
                                <Typography fontFamily='Noto Sans KR' fontSize="5px">화장실 {shower}개</Typography>
                            </OptionWrapper>
                            : null}

                        {minPerson ?
                            <OptionWrapper>

                                <BsPerson size={25} />

                                <Typography fontFamily='Noto Sans KR' fontSize="5px">기준인원 {minPerson}명</Typography>
                            </OptionWrapper>
                            : null}
                        {maxPerson ?
                            <OptionWrapper>

                                <BsPersonPlus size={25} />

                                <Typography fontFamily='Noto Sans KR' fontSize="5px">최대인원 {maxPerson}명</Typography>
                            </OptionWrapper>
                            : null}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "12px", marginRight: "10px" }}>
                            <Typography fontFamily='sunflower' fontSize="12px" fontWeight="600">
                                CHECK IN
                            </Typography>
                            <Typography fontFamily='Noto Sans KR' fontSize="5px" fontWeight="400">
                                {moment(checkInTime, "HH:mm:ss").format("A h시 m분")}
                            </Typography>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography fontFamily='sunflower' fontSize="12px" fontWeight="600">
                                CHECK OUT
                            </Typography>
                            <Typography fontFamily='Noto Sans KR' fontSize="5px" fontWeight="400">
                                {moment(checkOutTime, "HH:mm:ss").format("A h시 m분")}
                            </Typography>
                        </div>
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
        </div>
    )
}