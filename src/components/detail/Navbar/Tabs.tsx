import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { LuBuilding } from 'react-icons/lu'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { BsHouses, BsHouse } from 'react-icons/bs'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomizedTabs = styled(Tabs)`
&& .MuiTabs-indicator {
    background-color: #00adb5; 
`

const CustomizedTab = styled(Tab)`
&&&.Mui-selected {
    color: #00adb5; 
  }
`

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CategoryTabs() {
    const [value, setValue] = React.useState<number | null>(null);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <CustomizedTabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <CustomizedTab icon={<LuBuilding />} iconPosition="start" label="호텔" {...a11yProps(0)} />
                <CustomizedTab icon={<HiOutlineOfficeBuilding />} iconPosition="start" label="모텔" {...a11yProps(1)} />
                <CustomizedTab icon={<BsHouses />} iconPosition="start" label="펜션" {...a11yProps(2)} />
                <CustomizedTab icon={<BsHouse />} iconPosition="start" label="게스트하우스" {...a11yProps(3)} />
            </CustomizedTabs>
        </Box>
    );
}
