import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomIcon } from '../CustomIcon';


const LogoNavigationButton = styled(Button)`
border-color: #ffffff;
:hover {
  background-color: #ffffff;
}
`

interface LogoButtonProp {
    path: string;
    imageHeight: number;
    fontSize: string;
}

function windowLocation(address: string): void {
    window.location.href = address;
}

const LogoButton: React.FC<LogoButtonProp> = ({ path, imageHeight, fontSize }) => {

    const navigation = useNavigate()
    const location = useLocation();
    const isSearchPage = location.pathname.includes('/search/');

    const handleNavigate = (address: string) => {
        if (isSearchPage) {
            windowLocation(address)
        } else {
            navigation(address)
        }
    }

    return (
        <LogoNavigationButton disableRipple onClick={() => handleNavigate(path)}>
            <CustomIcon style={{ height: imageHeight, marginBottom: 5, color: "#00adb5" }} />
            <Typography sx={{ color: "#00ADB5", fontFamily: "sunflower", fontSize: fontSize }}>쉼표</Typography>
        </LogoNavigationButton>
    )
}

export default LogoButton