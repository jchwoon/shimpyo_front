import * as React from 'react';
import { useState } from 'react'
import moment from "moment";
import 'moment/locale/ko'
import styled from '@emotion/styled';

import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';
import { Days } from './Days';
import { Cells } from './Cells';
import { CellsRight } from './CellsRight';

const StyledCalendarDiv = styled.div`
padding:10px;
`

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(moment().format());
    const [selectedDate, setSelectedDate] = useState(moment().format());


    return (
        <StyledCalendarDiv>
                <div style={{display:'flex', flexDirection:'row'}}>
                        <div style={{display:'flex', flexDirection:'column', padding: "30px 15px 30px 30px"}}>
                            <HeaderLeft currentDate={currentDate} setCurrentDate={setCurrentDate} />
                            <Days/>
                            <Cells currentDate={currentDate}/>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', padding: "30px 30px 30px 15px"}}>
                            <HeaderRight currentDate={currentDate} setCurrentDate={setCurrentDate} />
                            <Days/>
                            <CellsRight currentDate={currentDate}/>
                        </div>
                    </div>
        </StyledCalendarDiv>
    )
}