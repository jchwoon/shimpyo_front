import { useState } from 'react';
import {
    DatePicker,
    DatePickerProvider,
    useDatePickGetter,
    useDatePickReset,
  } from '@bcad1591/react-date-picker';

export const CheckInOutCalendar = () => {
    const { pickedDates } = useDatePickGetter();
  const resetFunc = useDatePickReset();

    return  <div>
    <DatePicker disablePreviousDays />
    <hr />
    <div>{pickedDates.firstPickedDate?.toString()}</div>
    <div>{pickedDates.secondPickedDate?.toString()}</div>
    <button type="button" onClick={resetFunc}>
      Reset
    </button>
  </div>

}