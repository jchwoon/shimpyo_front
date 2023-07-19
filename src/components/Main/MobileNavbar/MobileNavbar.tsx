import {
    CustomizedAppBar,
    CustomizedToolBar,
    CustomizedSearchButton,
    CustomizedTypography,
    CustomizedDivider,
    CustomizedAvatar,
    CustomizedSearchIcon,
    CustomizedClearIcon,
    CustomizedModbileNavbarDeleteIconButton
} from "./MobileNavbar.style"
import { useState } from "react"

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { DrawerContent } from "./DrawerContent";

import { useRecoilState } from 'recoil';
import {
    objectPlaceholder,
    FirstPickedDate,
    SecondPickedDate,
    AdultGuest,
    ChildGuest,
    InfantGuest,
    HouseType
} from "../../../recoil/navBarAtoms";
import moment from "moment";

export default function MobileNavbar() {

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [activecard, setActiveCard] = useState('')

    const [ObjectPlaceholder, setObjectPlaceholder] = useRecoilState(objectPlaceholder);
    const [firstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate);
    const [secondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate);
    const [AdultGuestNumber, setAdultGuestNumber] = useRecoilState(AdultGuest);
    const [ChildGuestNumber, setChildGuestNumber] = useRecoilState(ChildGuest);
    const [InfantGuestNumber, setInfantGuestNumber] = useRecoilState(InfantGuest);
    const [value, setValue] = useRecoilState(HouseType)

    const address = ObjectPlaceholder.description
    const addressArray = address.split(' ')
    const district = addressArray.length === 3 ? addressArray[2] : null
    const city = addressArray[1] === undefined ? null : addressArray[1]
    const paperProps = {
        style: { backgroundColor: "#F7F7F7" },
    };

    function houseType(val: number) {
        var answer = null;
        switch (val) {
            case 0:
                answer = null;
                break;
            case 1:
                answer = "HOTEL";
                break;
            case 2:
                answer = "MOTEL";
                break;
            case 3:
                answer = "PENSION";
                break;
            case 4:
                answer = "GUEST";
                break;
        }
        return answer;
    }

    const houseTypeValue = houseType(value)

    const searchNavigate = `/search/?city=${city}&district=${district}&firstpickeddate=${moment(firstPickedDate).format('YYYY-MM-DDTHH:mm:ss')}&secondpickeddate=${moment(secondPickedDate).format('YYYY-MM-DDTHH:mm:ss')}&totalguestnumber=${AdultGuestNumber + ChildGuestNumber + InfantGuestNumber}&housetype=${houseTypeValue}`

    function handleSearchNavigate(address: string): void {
        window.location.href = address;
    }

    return <>
        <SwipeableDrawer
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            anchor="top"
            PaperProps={paperProps}
        >
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "5px", paddingRight: "10px", position: "absolute" }}>
                <CustomizedModbileNavbarDeleteIconButton onClick={toggleDrawer(false)} >
                    <CustomizedClearIcon />
                </CustomizedModbileNavbarDeleteIconButton>
            </div>
            <DrawerContent activecard={activecard} setActiveCard={setActiveCard} open={open} searchNavigate={searchNavigate} handleSearchNavigate={handleSearchNavigate} />
        </SwipeableDrawer>
        <CustomizedAppBar elevation={0}>
            <CustomizedToolBar>
                <CustomizedSearchButton
                    variant="contained"
                    disableRipple
                    onClick={toggleDrawer(true)}
                >
                    <div onClick={() => setActiveCard('card1')}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" sx={{ paddingLeft: "20px", paddingRight: "15px", width: "100px" }}>
                            어디든지
                        </CustomizedTypography>
                    </div>
                    <CustomizedDivider orientation="vertical" flexItem />
                    <div onClick={() => setActiveCard('card2')}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" sx={{ paddingLeft: "15px", paddingRight: "15px", width: "90px" }}>
                            언제든지
                        </CustomizedTypography>
                    </div>
                    <CustomizedDivider orientation="vertical" flexItem />
                    <div onClick={() => setActiveCard('card3')}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" sx={{ paddingLeft: "20px", width: "100px" }}>
                            게스트 추가
                        </CustomizedTypography>
                    </div>
                    <CustomizedAvatar sx={{ marginLeft: "3px" }} onClick={() => handleSearchNavigate(searchNavigate)}>
                        <CustomizedSearchIcon />
                    </CustomizedAvatar>
                </CustomizedSearchButton>
            </CustomizedToolBar>
        </CustomizedAppBar>
    </>
}