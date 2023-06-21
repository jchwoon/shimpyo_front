import { AiOutlineWifi } from "react-icons/ai"
import { GiPc } from 'react-icons/gi';
import { TbGrill } from 'react-icons/tb';
import { BsFillCarFrontFill } from 'react-icons/bs';
import { Card, Typography } from "@mui/material"
import styled from "@emotion/styled"

const CustomizedCard = styled(Card)`
width: 120px;
height: 50px;
border-radius: 10px;
display: flex;
justify-content:center;
align-items: center;
margin-right:10px;
`

export const Wifi = () => {
    return (
        <CustomizedCard variant="outlined">
            <AiOutlineWifi style={{ marginRight: "10px" }} />
            <Typography fontFamily='Noto Sans KR'>와이파이</Typography>
        </CustomizedCard>
    )
}

export const PC = () => {
    return (
        <CustomizedCard variant="outlined">
            <GiPc style={{ marginRight: "10px" }} />
            <Typography fontFamily='Noto Sans KR'>PC</Typography>
        </CustomizedCard>
    )
}

export const Barbeque = () => {
    return (
        <CustomizedCard variant="outlined">
            <TbGrill style={{ marginRight: "10px" }} />
            <Typography fontFamily='Noto Sans KR'>바베큐</Typography>
        </CustomizedCard>
    )
}

export const Parking = () => {
    return (
        <CustomizedCard variant="outlined">
            <BsFillCarFrontFill style={{ marginRight: "10px" }} />
            <Typography fontFamily='Noto Sans KR'>주차</Typography>
        </CustomizedCard>
    )
}