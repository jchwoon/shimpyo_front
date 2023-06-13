import {
    DatePicker,
    useDatePickGetter,
    useDatePickReset,
} from '@bcad1591/react-date-picker';
import "./styles.css"

import { useRecoilState, useRecoilValue } from "recoil";
import { FirstPickedDate, SecondPickedDate } from "../../recoil/atoms";
import { useEffect } from "react"
import moment from "moment"
import 'moment/locale/ko'


export function Calendar() {
    const { pickedDates } = useDatePickGetter();
    const [getFirstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate)
    const [getSecondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate)
    const momentizedFirstPickedMoment = moment(pickedDates.firstPickedDate)
    const momentizedSecondPickedMoment = moment(pickedDates.secondPickedDate)

    useEffect(() => {
        if (pickedDates.firstPickedDate) {
            setFirstPickedDate(momentizedFirstPickedMoment.format("MMMM Do"))
        }
    }, [momentizedFirstPickedMoment])

    useEffect(() => {
        if (pickedDates.secondPickedDate) {
            setSecondPickedDate(momentizedSecondPickedMoment.format("MMMM Do"))
        }
    }, [momentizedSecondPickedMoment])

    return (
        <div className="custom-calendar2">
            <DatePicker disablePreviousDays />
        </div>
    );
}