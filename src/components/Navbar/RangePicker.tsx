import React from "react";
import { DateRangePicker, DateRange } from "mui-daterange-picker";

type Props = {}

const App: React.FunctionComponent<Props> = props => {
    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<DateRange>({});

    const toggle = () => setOpen(!open);

    return (
        <DateRangePicker
            open={open}
            toggle={toggle}
            onChange={(range) => setDateRange(range)}
        />
    );
}

export default App;