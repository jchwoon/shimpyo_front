import * as React from 'react';
import { useState } from 'react'
import moment from "moment";
import 'moment/locale/ko'
import Button from '@mui/material/Button';

interface HeaderProps {
    currentMonth: string;
    setCurrentMonth: (value: string) => void;
}


export const Header: React.FC<HeaderProps> = ({ currentMonth, setCurrentMonth }) => {

    const PrevButtonClick = () => {
        setCurrentMonth(currentMonth.add(1, "months").)
    }


    return (
        <div>
            <Button>Prev</Button>

            {currentMonth}

            <Button>Next</Button>
        </div>
    );
};