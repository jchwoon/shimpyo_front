import * as React from 'react';
import { useState } from 'react'
import moment from "moment";
import 'moment/locale/ko'
import Button from '@mui/material/Button';

import { Header } from './Header';

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(moment(new Date()).format("YYYY년 MMMM"));
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className='calendar'>

            <Header currentMonth={currentMonth} setcurrentMonth={setCurrentMonth} />

        </div>
    )
}