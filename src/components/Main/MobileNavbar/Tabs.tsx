import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { LuBuilding } from 'react-icons/lu'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { BsHouses, BsHouse } from 'react-icons/bs'
import { BiBuildingHouse } from 'react-icons/bi'
import { useRecoilState } from 'recoil';
import { HouseType } from '../../../recoil/navBarAtoms';

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
    // const [value, setValue] = React.useState<number>(0);
    const [value, setValue] = useRecoilState(HouseType)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "85%" }}>
                <CustomizedTabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons={true} allowScrollButtonsMobile>
                    <CustomizedTab iconPosition="start" label="전체" {...a11yProps(0)} />
                    <CustomizedTab iconPosition="start" label="호텔" {...a11yProps(1)} />
                    <CustomizedTab iconPosition="start" label="모텔" {...a11yProps(2)} />
                    <CustomizedTab iconPosition="start" label="펜션" {...a11yProps(3)} />
                    <CustomizedTab iconPosition="start" label="게스트하우스" {...a11yProps(4)} />
                </CustomizedTabs>
            </Box>
        </div>
    );
}
