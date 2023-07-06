import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface CustomizedBottomNavigationProps {
    icon: ReactNode;
    onClick: () => void;
    label: ReactNode;
}

const CustomizedBottomNavigation = ({ icon, onClick, label }: CustomizedBottomNavigationProps) => {
    return (
        <BottomNavigationAction icon={icon} onClick={onClick}
            label={
                label
            }
        />
    )
}

export default CustomizedBottomNavigation