import * as React from 'react';
import { useState } from 'react'
import moment from "moment";
import 'moment/locale/ko'
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';

const StyledHeaderDiv = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

interface HeaderProps {
    currentDate: string;
    setCurrentDate: (value: string) => void;
}

export const HeaderLeft: React.FC<HeaderProps> = ({ currentDate, setCurrentDate }) => {

    const currentMonth = moment(currentDate).format("YYYY년 M월");

    const PrevButtonClick = () => {
        setCurrentDate(moment(currentDate).subtract(1, "months").format())
    }

    const NextButtonClick = () => {
        setCurrentDate(moment(currentDate).add(1, "months").format())
    }

    return (
        <StyledHeaderDiv>
            <IconButton onClick={PrevButtonClick}><KeyboardArrowLeftIcon /></IconButton>
            <Typography fontFamily='Noto Sans KR' fontWeight="500">
                {currentMonth}
            </Typography>
            <div />
        </StyledHeaderDiv>
    );
};