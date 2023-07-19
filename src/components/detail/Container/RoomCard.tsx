import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
    CustomizedCard, CustomizedPricePerNightTypography,
    CustomizedTitleRowBox, CustomizedTitleTypography, OptionWrapper, HoverDiv
} from "./RoomCard.styled"

import { LuBedDouble } from 'react-icons/lu'
import { MdOutlineBedroomParent } from 'react-icons/md'
import { LuShowerHead } from 'react-icons/lu'
import { BsPerson, BsPersonPlus } from 'react-icons/bs'
import { Typography } from '@mui/material';

import { useRecoilState } from "recoil";
import { activeRoomPrice, activeRoomName, activeRoomNumber } from '../../../recoil/detailPageAtoms';
import { useState, useEffect } from 'react';
import moment from "moment";
import 'moment/locale/ko'

import Modal from '@mui/material/Modal';
import ModalImageBox from './ModalImageBox';


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
    roomId: number;
}


export const RoomCard: React.FC<RommCardProps> = ({ image, name, doubleBed, bedroom, shower, minPerson, maxPerson, checkInTime, checkOutTime, price, onClick, active, roomId }) => {

    const [roomPrice, setRoomPrice] = useRecoilState(activeRoomPrice);
    const [roomName, setRoomName] = useRecoilState(activeRoomName);
    const [roomNumber, setRoomNumber] = useRecoilState(activeRoomNumber);

    useEffect(() => {
        if (active) {
            setRoomPrice(price);
            setRoomName(name);
            setRoomNumber(roomId);
        }
    }, [active]);

    const [open, setOpen] = useState(false);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const newImage = new Image()
    newImage.src = image[0]
    const originalWidth = newImage.naturalWidth;
    const originalHeight = newImage.naturalHeight;


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

    const momentCheckInTime = moment(checkInTime, "HH:mm:ss").format("A h시 m분").endsWith("0분")
        ?
        moment(checkInTime, "HH:mm:ss").format("A h시")
        :
        moment(checkInTime, "HH:mm:ss").format("A h시 m분")

    const momentCheckOutTime = moment(checkOutTime, "HH:mm:ss").format("A h시 m분").endsWith("0분")
        ?
        moment(checkOutTime, "HH:mm:ss").format("A h시")
        :
        moment(checkOutTime, "HH:mm:ss").format("A h시 m분")

    return (
        <>
            <CustomizedCard onClick={onClick}
                active={active}
                className={active ? "activeRoomCard" : ""}>
                <div style={{
                    width: "119px",
                    height: "150px",
                    position: "relative"
                }}>
                    <HoverDiv onClick={handleOpen} />
                    <CardMedia
                        component="div"
                        sx={{
                            borderRadius: "10px",
                            width: "100%",
                            height: "100%",
                        }}
                        image={image[0]}
                    />
                </div>
                <CardContent sx={{ width: 'calc(100% - 119px)' }}>
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
                        <div style={{ display: "flex", flexDirection: "row" }}>
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
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "12px", marginRight: "10px" }}>
                            <Typography fontFamily='sunflower' fontSize="12px" fontWeight="600">
                                CHECK IN
                            </Typography>
                            <Typography fontFamily='Noto Sans KR' fontSize="5px" fontWeight="400">
                                {momentCheckInTime}
                            </Typography>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography fontFamily='sunflower' fontSize="12px" fontWeight="600">
                                CHECK OUT
                            </Typography>
                            <Typography fontFamily='Noto Sans KR' fontSize="5px" fontWeight="400">
                                {momentCheckOutTime}
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <ModalImageBox
                        imageList={image}
                        modalPicture={0}
                        width={windowWidth * 0.8 > originalWidth ? originalWidth : windowWidth * 0.8}
                        height={windowHeight * 0.9 > originalHeight ? originalHeight : windowHeight * 0.8} />
                </div>
            </Modal>
        </>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: "none"
};