import {
    CustomizedAppBar,
    CustomizedToolBar,
    CustomizedSearchButtonWrapperDiv,
    CustomizedSearchButton,
    CustomizedTypography,
    CustomizedDivider,
    CustomizedAvatar,
    CustomizedSearchIcon,
    CustomziedClearIcon,
    CustomizedDeleteIconButton
} from "./MobileNavbar.style"
import { useState } from "react"

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import DrawerContent from "./DrawerContent";

export default function MobileNavbar() {

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const paperProps = {
        style: { backgroundColor: "#F7F7F7" },
    };

    return <>
        <SwipeableDrawer
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            anchor="top"
            PaperProps={paperProps}
        >
            <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
                <CustomizedDeleteIconButton onClick={toggleDrawer(false)} >
                    <CustomziedClearIcon />
                </CustomizedDeleteIconButton>
            </div>
            <DrawerContent />
        </SwipeableDrawer>
        <CustomizedAppBar elevation={0}>
            <CustomizedToolBar>
                <CustomizedSearchButton
                    variant="contained"
                    disableRipple
                    onClick={toggleDrawer(true)}
                >
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" sx={{ paddingLeft: "20px", paddingRight: "15px" }}>
                        어디든지
                    </CustomizedTypography>
                    <CustomizedDivider orientation="vertical" flexItem />
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" sx={{ paddingLeft: "15px", paddingRight: "15px" }}>
                        언제든지
                    </CustomizedTypography>
                    <CustomizedDivider orientation="vertical" flexItem />
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" sx={{ paddingLeft: "20px" }}>
                        게스트 추가
                    </CustomizedTypography>
                    <CustomizedAvatar sx={{ marginLeft: "15px" }} >
                        <CustomizedSearchIcon />
                    </CustomizedAvatar>
                </CustomizedSearchButton>
            </CustomizedToolBar>
        </CustomizedAppBar>
    </>
}