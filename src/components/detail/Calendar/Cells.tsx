import * as React from 'react';
import moment from "moment";
import 'moment/locale/ko'
import styled from '@emotion/styled';
import "./styles.css"
import { useRecoilState, useRecoilValue } from "recoil";
import { FirstPickedDate, SecondPickedDate } from "../../../recoil/navBarAtoms";

interface HeaderProps {
    currentDate: string;
}

const StyledCellsDiv = styled.div`
display:flex;
flex-direction:column;
`

const StyledRowsDiv = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
`

const StyledDaysSquareDiv = styled.div`
// height: 50px;
// width: 50px;

height: 35px;
width: 35px;

display:flex;
justify-content: center;
align-items: center;
margin-bottom:2px;
&.betweenClicked {
    background-color: #eeeeee;
}
&.firstClicked {
    background-color: linear-gradient {
        to right,
        #ffffff 50%,
        #eeeeee 50%
      };
}
`

const StyledDaysRoundDiv = styled.div`
// height: 50px;
// width: 50px;

height: 35px;
width: 35px;

display:flex;
justify-content: center;
align-items: center;
&.visible{
    color: #000000;
}
&.blur {
    color: #e1e1e1;
    pointer-events: none;
}
&.hidden {
    visibility: hidden;
}
&:hover {
    background-color: #00adb50d;
}
border-radius: 50%;
&.clicked {
    background-color: #00adb5;
    color: #ffffff;
}
`

export const Cells: React.FC<HeaderProps> = ({ currentDate }) => {

    const monthStart = moment(currentDate).startOf('month').format()
    const monthEnd = moment(currentDate).endOf('month').format()
    const startDate = moment(monthStart).startOf('week').format()
    const endDate = moment(monthEnd).endOf('week').format()

    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''

    const [firstClicked, setFirstClicked] = useRecoilState(FirstPickedDate)
    const [secondClicked, setSecondClicked] = useRecoilState(SecondPickedDate)

    if (firstClicked && secondClicked && moment(firstClicked).isAfter(moment(secondClicked))) {
        const firstClickedClone = firstClicked
        const SecondClickedClone = secondClicked
        setFirstClicked(SecondClickedClone)
        setSecondClicked(firstClickedClone)
    }

    const handleClicked = (day: string) => {
        firstClicked === ''
            ?
            setFirstClicked(day)
            :
            firstClicked === day
                ?
                setFirstClicked('')
                :
                secondClicked === ''
                    ?
                    setSecondClicked(day)
                    :
                    secondClicked === day
                        ?
                        setSecondClicked('')
                        :
                        setSecondClicked(day)
    }

    while (moment(day).isSameOrBefore(moment(endDate))) {

        for (let i = 0; i < 7; i++) {
            formattedDate = moment(day).format('D')
            const cloneDay = day
            days.push(
                <StyledDaysSquareDiv
                    key={day}
                    className={
                        `${moment(cloneDay).isBetween((moment(firstClicked)), (moment(secondClicked))) ? "betweenClicked" : null}
                    ${firstClicked && secondClicked && moment(cloneDay).isSame(moment(firstClicked)) ? "firstClicked" : null}
                    ${firstClicked && secondClicked && moment(cloneDay).isSame(moment(secondClicked)) ? "secondClicked" : null}
                    `
                    }
                >
                    <StyledDaysRoundDiv
                        key={day}
                        onClick={() => handleClicked(cloneDay)}
                        style={{ fontSize: "12px" }}
                        className={`${moment(day).isSame(moment(monthStart), 'month')
                            ?
                            moment(cloneDay).isAfter(moment())
                                ?
                                "visible"
                                :
                                "blur"
                            :
                            moment(day).isAfter(moment(monthStart))
                                ?
                                "hidden"
                                :
                                "blur"
                            }
                ${moment(cloneDay).isSame(moment(firstClicked)) || moment(cloneDay).isSame(moment(secondClicked)) ? "clicked" : null}
                `}>
                        {formattedDate}
                    </StyledDaysRoundDiv>
                </StyledDaysSquareDiv>
            )
            day = moment(day).add(1, "days").format()
        }
        rows.push(
            <StyledRowsDiv key={day}>
                {days}
            </StyledRowsDiv>
        )
        days = []
    }

    return (
        <StyledCellsDiv>
            {rows}
        </StyledCellsDiv>
    )
}