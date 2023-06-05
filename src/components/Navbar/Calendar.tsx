import { useState } from 'react';
import { Calendar } from 'react-rainbow-components';

const initialState = {
    range: [
        new Date(2019, 11, 23),
        new Date(2020, 0, 15)
    ]
};
const calendarContainerStyles = {
    maxWidth: '820px'
};


const RangeCalendar = () => {
    const [state, setState] = useState(initialState)
    return <div className="rainbow-m_auto rainbow-align-content_center rainbow-p-vertical_xx-large"
        style={calendarContainerStyles}
    >
        <Calendar
            id="calendar-11"
            variant="double"
            selectionType="range"
            value={state.range}
            onChange={value => setState({ range: value })}
            disabledDays={['2020/01/23']}
        />
    </div>

}