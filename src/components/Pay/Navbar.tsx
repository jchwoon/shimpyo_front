
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';

import LogoButton from './LogoButton';

const CustomizedAppBar = styled(AppBar) <{ appbarheight: string }>`
background-color: #fff;
padding-left : 40px;
padding-right : 40px;
height: ${({ appbarheight }) => appbarheight};
position: relative;
transition: height 0.3s ease;
`

const CustomizedToolBar = styled(Toolbar)`
height: 80px;
justify-content: space-between;
`

export default function Navbar() {
    return (
        <CustomizedAppBar elevation={0} appbarheight={"80px"}>
            <CustomizedToolBar>
                <LogoButton path={'/'} imageHeight={13} fontSize={"25px"} />
            </CustomizedToolBar>
        </CustomizedAppBar >
    );
}
