import {
  CustomizedLogoTypography,
  CustomizedAvatar,
  CustomizedDivider,
  CustomizedAdditionalDivider,
  CustomizedLoginButton,
  CustomizedMenuIcon,
  CustomizedSearchButton,
  CustomizedSearchInsideButton,
  CustomizedAdditionalSearchInsideButton,
  CustomizedSearchIcon,
  CustomizedToolBar,
  CustomizedTypography,
  CustomizedChangeTypography,
  LogoButton,
  CustomizedAppBar,
  CustomizedSearchButtonWrapperDiv,
  CustomizedTextfield,
  CustomizedWhereVerticalWrapperDiv,
  CustomizedWhenVerticalWrapperDiv,
  CustomizedAddtionalWhenVerticalWrapperDiv,
  CustomizedGuestVerticalWrapperDiv,
  CustomizedActiveSearchButton,
  CustomizedAdditionalActiveSearchButton,
  CustomizedMenu,
} from "./Navbar.styled"
import GuestCount from "../GuestCount/GuestCount";
import Typography from '@mui/material/Typography';
import logo2 from "../../logo2.svg"
import { Divider, ClickAwayListener, IconButton } from '@mui/material';
import CustomizedMenus from "../LoginModal/LoginModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { Height, Display, Change, AdultGuest, ChildGuest, InfantGuest } from "../../recoil/atoms";
import { useState, ReactNode } from "react";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from "./GuestCount";

import {
  DatePickerProvider,
} from '@bcad1591/react-date-picker';
import  {CheckInOutCalendar}  from "./Calendar";

export default function Navbar() {

  const [appBarHeight, setAppBarHeight] = useRecoilState(Height)
  const [customDisplay, setCustomDisplay] = useRecoilState(Display);
  const [change, setChange] = useRecoilState(Change);
  const handleClick = () => {
    setAppBarHeight("160px");
    setCustomDisplay(true);
    setChange(true);
  }

  const [activeButton, setActiveButton] = useState('')
  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  }
  const clickAwayHandler = () => {
    if (activeButton !== "") {
      setActiveButton("")
    }
  }

  //checkInOut menu
  const [checkInOutAnchorEl, setCheckInOutAnchorEl] = useState<null | HTMLElement>(null);
  const checkInOutOpen = Boolean(checkInOutAnchorEl);
  const handleCheckInOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCheckInOutAnchorEl(event.currentTarget);
  };
  const checkInOutClose = () => {
    setCheckInOutAnchorEl(null);
  };

  //guestCount menu
  const [guestCountAnchorEl, setGuestCountAnchorEl] = useState<null | HTMLElement>(null);
  const guestCountOpen = Boolean(guestCountAnchorEl);
  const handleGuestCountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGuestCountAnchorEl(event.currentTarget);
  };
  const guestCountClose = () => {
    setGuestCountAnchorEl(null);
  };

  const [AdultGuestNumber, setAdultGuestNumber] = useRecoilState(AdultGuest);
  const ChildGuestNumber = useRecoilValue(ChildGuest);
  const InfantGuestNumber = useRecoilValue(InfantGuest);
  const TotalGuestNumber = AdultGuestNumber + ChildGuestNumber
  if (InfantGuestNumber > 0 && AdultGuestNumber === 0) {
    setAdultGuestNumber(prevValue => prevValue + 1)
  }
  const TotalGuestNumberCount = InfantGuestNumber === 0 ? `게스트 ${TotalGuestNumber}명` : `게스트 ${TotalGuestNumber} 명, 유아 ${InfantGuestNumber}명 `

  return (
    <CustomizedAppBar elevation={0} appBarHeight={appBarHeight}>
      <CustomizedToolBar change={change}>
        <LogoButton disableRipple >
          <img src={logo2} alt="website logo" style={{ height: 13, marginBottom: 5 }} />
          <CustomizedLogoTypography>
            쉼표
          </CustomizedLogoTypography>
        </LogoButton>
        <CustomizedSearchButtonWrapperDiv change={change}>
          <ClickAwayListener onClickAway={clickAwayHandler}>

            <CustomizedSearchButton variant="contained" disableRipple onClick={handleClick} change={change} disableElevation={change ? true : false} activeButton={activeButton}>
              {!change ?
                <div onClick={() => handleButtonClick('button1')} style={{ height: "50px", display: "flex", alignItems: "center" }}>
                  <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" sx={{ paddingLeft: "20px", paddingRight: "15px" }}>
                    어디든지
                  </CustomizedTypography>
                </div>
                :
                activeButton === "button1" ?
                  <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px" }}>
                    <CustomizedWhereVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" >
                        여행지
                      </CustomizedTypography>
                      <CustomizedTextfield placeholder="여행지 검색" variant="outlined" change={change} sx={{ width: "200px" }} />
                    </CustomizedWhereVerticalWrapperDiv>
                  </CustomizedActiveSearchButton>
                  :
                  <CustomizedSearchInsideButton change={change} disableRipple sx={{ paddingLeft: "20px" }} onClick={() => handleButtonClick('button1')} >
                    <CustomizedWhereVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" >
                        여행지
                      </CustomizedTypography>
                      <CustomizedTextfield placeholder="여행지 검색" variant="outlined" change={change} sx={{ width: "200px" }} />
                    </CustomizedWhereVerticalWrapperDiv>
                  </CustomizedSearchInsideButton>
              }
              <CustomizedDivider orientation="vertical" flexItem change={change} />
              {!change ?
                <div onClick={() => handleButtonClick('button2')} style={{ height: "50px", display: "flex", alignItems: "center" }}>
                  <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" sx={{ paddingLeft: "15px", paddingRight: "15px" }}>
                    언제든지
                  </CustomizedTypography>
                </div>
                :
                activeButton === "button2" ?
                  <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={handleCheckInOutClick}>
                    <CustomizedWhenVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                        {change ? "체크인" : "언제든지"}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change}>
                        날짜 추가
                      </CustomizedChangeTypography>
                    </CustomizedWhenVerticalWrapperDiv>
                  </CustomizedActiveSearchButton>
                  :
                  <CustomizedSearchInsideButton change={change} disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => handleButtonClick('button2')}>
                    <CustomizedWhenVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                        체크인
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change}>
                        날짜 추가
                      </CustomizedChangeTypography>
                    </CustomizedWhenVerticalWrapperDiv>
                  </CustomizedSearchInsideButton>
              }

              <CustomizedMenu
                id="basic-menu"
                anchorEl={checkInOutAnchorEl}
                open={checkInOutOpen}
                onClose={checkInOutClose}
                elevation={1}
              >
                <DatePickerProvider>
                  <CheckInOutCalendar />
                </DatePickerProvider>
              </CustomizedMenu>

              <CustomizedAdditionalDivider orientation="vertical" flexItem change={change} />
              {activeButton === "button3" ?
                <CustomizedAdditionalActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} change={change}>
                  <CustomizedAddtionalWhenVerticalWrapperDiv change={change}>
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                      {change ? "체크아웃" : ""}
                    </CustomizedTypography>
                    <CustomizedChangeTypography change={change}>
                      날짜 추가
                    </CustomizedChangeTypography>
                  </CustomizedAddtionalWhenVerticalWrapperDiv>
                </CustomizedAdditionalActiveSearchButton>
                :
                <CustomizedAdditionalSearchInsideButton change={change} disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => handleButtonClick('button3')}>
                  <CustomizedAddtionalWhenVerticalWrapperDiv change={change}>
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                      {change ? "체크아웃" : ""}
                    </CustomizedTypography>
                    <CustomizedChangeTypography change={change}>
                      날짜 추가
                    </CustomizedChangeTypography>
                  </CustomizedAddtionalWhenVerticalWrapperDiv>
                </CustomizedAdditionalSearchInsideButton>
              }
              <CustomizedDivider orientation="vertical" flexItem change={change} />
              <CustomizedGuestVerticalWrapperDiv change={change}>
                {!change ?
                  <div onClick={() => handleButtonClick('button4')} style={{ height: "50px", display: "flex", alignItems: "center" }}>
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" sx={{ paddingLeft: "20px" }}>
                      게스트 추가
                    </CustomizedTypography>
                  </div>
                  :
                  activeButton === "button4" ?
                    <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={handleGuestCountClick}>
                      <CustomizedGuestVerticalWrapperDiv change={change}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                          여행자
                        </CustomizedTypography>
                        <CustomizedChangeTypography change={change}>
                          {TotalGuestNumber > 0 ? TotalGuestNumberCount : "게스트 추가"}
                        </CustomizedChangeTypography>
                      </CustomizedGuestVerticalWrapperDiv>
                    </CustomizedActiveSearchButton>
                    :
                    <CustomizedSearchInsideButton change={change} disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => handleButtonClick('button4')}>
                      <CustomizedGuestVerticalWrapperDiv change={change}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                          여행자
                        </CustomizedTypography>
                        <CustomizedChangeTypography change={change}>
                          {TotalGuestNumber > 0 ? TotalGuestNumberCount : "게스트 추가"}
                        </CustomizedChangeTypography>
                      </CustomizedGuestVerticalWrapperDiv>
                    </CustomizedSearchInsideButton>
                }
                <CustomizedMenu
                  id="basic-menu"
                  anchorEl={guestCountAnchorEl}
                  open={guestCountOpen}
                  onClose={guestCountClose}
                  elevation={1}
                >
                  <GuestCountAdult />
                  <Divider variant="middle" />
                  <GuestCountChild />
                  <Divider variant="middle" />
                  <GuestCountInfant />
                </CustomizedMenu>

              </CustomizedGuestVerticalWrapperDiv>
              <CustomizedAvatar sx={{ marginLeft: "15px" }} change={change}>
                <CustomizedSearchIcon change={change} />
              </CustomizedAvatar>
            </CustomizedSearchButton>
          </ClickAwayListener>
        </CustomizedSearchButtonWrapperDiv>

        <CustomizedMenus />
      </CustomizedToolBar>
    </CustomizedAppBar >
  )
}