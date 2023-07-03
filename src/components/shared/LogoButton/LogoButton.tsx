import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

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

const LogoButton: React.FC<LogoButtonProp> = ({ path, imageHeight, fontSize }) => {

    const Navigation = useNavigate()

    return (
        <LogoNavigationButton disableRipple onClick={() => Navigation(path)}>
            <img src="images/logo2.svg" alt="website logo" style={{ height: imageHeight, marginBottom: 5 }} />
            <Typography sx={{ color: "#00ADB5", fontFamily: "sunflower", fontSize: fontSize }}>쉼표</Typography>
        </LogoNavigationButton>
    )
}

export default LogoButton