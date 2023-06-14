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
  CustomizedDeleteIconButton,
  CustomziedClearIcon,
  CustomizedDeleteIconButtonInSearchField,
  CustomizedDeleteIconButtonInGuestCount
} from "./Navbar.styled"
import logo2 from "../../logo2.svg"
import { Divider, ClickAwayListener } from '@mui/material';
import CustomizedMenus from "../LoginModal/LoginModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Height,
  Display,
  Change,
  AdultGuest,
  ChildGuest,
  InfantGuest,
  FirstPickedDate,
  SecondPickedDate,
  googleMapsPlaceholder,
  PlaceholderChanged
} from "../../recoil/atoms";
import { useState, useEffect } from "react";

import {
  useDatePickReset,
} from '@bcad1591/react-date-picker';
import { Calendar } from "./Calendar";

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from "./GuestCount";

import GoogleMaps from "./MuiSearchField";

export default function Navbar() {

  const [appBarHeight, setAppBarHeight] = useRecoilState(Height)
  const [customDisplay, setCustomDisplay] = useRecoilState(Display);
  const [change, setChange] = useRecoilState(Change);
  const [firstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate);
  const [secondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate);
  const [GoogleMapsPlaceholder, setGoogleMapsPlaceholder] = useRecoilState(googleMapsPlaceholder)

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

  const customizedSearchButton = document.getElementById('customizedSearchButton')

  const [checkInOutAnchorEl, setCheckInOutAnchorEl] = useState<null | HTMLElement>(null);
  const checkInOutOpen = Boolean(checkInOutAnchorEl);
  const handleCheckInOutClick = () => {
    setCheckInOutAnchorEl(customizedSearchButton);
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
  const [ChildGuestNumber, setChildGuestNumber] = useRecoilState(ChildGuest);
  const [InfantGuestNumber, setInfantGuestNumber] = useRecoilState(InfantGuest);
  const TotalGuestNumber = AdultGuestNumber + ChildGuestNumber
  if (InfantGuestNumber > 0 && AdultGuestNumber === 0) {
    setAdultGuestNumber(prevValue => prevValue + 1)
  }
  const TotalGuestNumberCount = InfantGuestNumber === 0 ? `게스트 ${TotalGuestNumber}명` : `게스트 ${TotalGuestNumber} 명, 유아 ${InfantGuestNumber}명 `

  const guestCountReset = () => {
    setAdultGuestNumber(0);
    setChildGuestNumber(0);
    setInfantGuestNumber(0);
  }

  //calendar delete button
  const [deleteButtonExist, setDeleteButtonExist] = useState(false)
  const reset = useDatePickReset();
  const resetFunction = () => {
    reset();
    setFirstPickedDate(null);
    setSecondPickedDate(null)
    setDeleteButtonExist(false)
    if (firstPickedFirst) {
      handleButtonClick('button2')
    }
    if (!firstPickedFirst) {
      handleButtonClick('button3')
    }
  }

  const [buttonPosition, setButtonPostion] = useState({ top: 0, left: 0 })

  const firstDivider = document.getElementById('firstDivider')
  const secondDivider = document.getElementById('secondDivider')
  const thirdDivider = document.getElementById('thirdDivider')
  const targetDiv = document.querySelector('.jshaaC, .iNDSBv');

  //searchfield delete button

  const [placeholderChanged, setPlaceholderChanged] = useRecoilState(PlaceholderChanged)

  const resetFunctionInSearchField = () => {
    setGoogleMapsPlaceholder('')
    setPlaceholderChanged(false)
  }


  useEffect(() => {
    if (targetDiv) {
      const targetDivDoubleCheck = document.querySelector('.jshaaC, .iNDSBv');
      if (targetDivDoubleCheck) { setDeleteButtonExist(true); }
    }
    const updateButtonPosition = () => {
      if (activeButton === "button2") {
        if (firstDivider) {
          const { top, left, } = firstDivider.getBoundingClientRect();
          setButtonPostion({ top: top - 10, left: left - 10 });
        }
      }
      if (activeButton === "button3") {
        if (secondDivider) {
          const { top, left, } = secondDivider.getBoundingClientRect();
          setButtonPostion({ top: top - 10, left: left - 10 });
        }
      }
    }
    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
  }, [activeButton, targetDiv, checkInOutOpen])

  //calendar date order
  const [firstPickedFirst, setFirstPickedFirst] = useState(true)

  useEffect(() => {
    // if (activeButton === "button3" && firstPickedFirst === true && targetDiv === null) {
    if (activeButton === "button3" && firstPickedFirst === true && checkInOutOpen === false) {
      //정상 순서에서 calendar가 나오기 전 button2에서 button3로 변경할 때 반대 순서로 변경
      setFirstPickedFirst(false)
    }
  }, [activeButton, firstPickedFirst, targetDiv])

  useEffect(() => {
    // if (activeButton === "button2" && firstPickedFirst === false && targetDiv === null) {
    if (activeButton === "button2" && firstPickedFirst === false && checkInOutOpen === false) {
      //반대 순서에서 calendar가 나오기 전 button3에서 button2로 변경할 때 정상 순서로 변경
      setFirstPickedFirst(true)
    }
  }, [activeButton, firstPickedFirst, targetDiv])

  if (activeButton === "button3" && firstPickedFirst === false && firstPickedDate && !secondPickedDate && checkInOutOpen === true) {
    //반대 순서에서 calendar가 나온 이후 button3에서 button2로 active 변경
    handleButtonClick('button2');
  }

  if (activeButton === "button2" && firstPickedFirst === true && firstPickedDate && !secondPickedDate && checkInOutOpen === true) {
    //정상 순서에서 calendar가 나온 이후 button2에서 button3으로 active 변경
    handleButtonClick('button3');
  }

  return (
    <CustomizedAppBar elevation={0} appBarHeight={appBarHeight}>
      <CustomizedToolBar>
        <LogoButton disableRipple >
          <img src={logo2} alt="website logo" style={{ height: 13, marginBottom: 5 }} />
          <CustomizedLogoTypography>
            쉼표
          </CustomizedLogoTypography>
        </LogoButton>
        <CustomizedSearchButtonWrapperDiv change={change}>
          <ClickAwayListener onClickAway={clickAwayHandler}>

            <CustomizedSearchButton
              id="customizedSearchButton"
              variant="contained"
              disableRipple
              onClick={handleClick}
              change={change}
              disableElevation={change ? true : false}
              activeButton={activeButton}
            >
              {!change ?
                <div onClick={() => handleButtonClick('button1')} style={{ height: "50px", display: "flex", alignItems: "center" }}>
                  <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" sx={{ paddingLeft: "20px", paddingRight: "15px" }}>
                    어디든지
                  </CustomizedTypography>
                </div>
                :
                activeButton === "button1" ?
                  <>
                    {placeholderChanged ?
                      <CustomizedDeleteIconButtonInSearchField onClick={resetFunctionInSearchField} top={0} left={-10} >
                        <CustomziedClearIcon />
                      </CustomizedDeleteIconButtonInSearchField>
                      :
                      null}
                    <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px" }} >
                      <CustomizedWhereVerticalWrapperDiv change={change}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" >
                          여행지
                        </CustomizedTypography>
                        <GoogleMaps placeholder={GoogleMapsPlaceholder} setPlaceholder={setGoogleMapsPlaceholder} setPlaceholderChanged={setPlaceholderChanged} />
                      </CustomizedWhereVerticalWrapperDiv>
                    </CustomizedActiveSearchButton>
                  </>
                  :
                  <CustomizedSearchInsideButton change={change} disableRipple sx={{ paddingLeft: "20px" }} onClick={() => handleButtonClick('button1')} >
                    <CustomizedWhereVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" textAlign="left" >
                        여행지
                      </CustomizedTypography>
                      <GoogleMaps placeholder={GoogleMapsPlaceholder} setPlaceholder={setGoogleMapsPlaceholder} setPlaceholderChanged={setPlaceholderChanged} />
                    </CustomizedWhereVerticalWrapperDiv>
                  </CustomizedSearchInsideButton>
              }
              <CustomizedDivider id="firstDivider" orientation="vertical" flexItem change={change} />
              {!change ?
                <div onClick={() => { handleButtonClick('button2') }} style={{ height: "50px", display: "flex", alignItems: "center" }}>
                  <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500" sx={{ paddingLeft: "15px", paddingRight: "15px" }}>
                    언제든지
                  </CustomizedTypography>
                </div>
                :
                activeButton === "button2" ?
                  <CustomizedActiveSearchButton id="activeCheckInButton" variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={handleCheckInOutClick}>
                    <CustomizedWhenVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                        {change ? "체크인" : "언제든지"}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change}>
                        {firstPickedFirst ?
                          firstPickedDate ? firstPickedDate : "날짜 추가"
                          :
                          firstPickedDate ? secondPickedDate ? firstPickedDate : "날짜 추가"
                            :
                            "날짜 추가"}
                      </CustomizedChangeTypography>
                    </CustomizedWhenVerticalWrapperDiv>
                  </CustomizedActiveSearchButton>
                  :
                  <CustomizedSearchInsideButton id="inactiveCheckInButton" change={change} disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => handleButtonClick('button2')}>
                    <CustomizedWhenVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                        체크인
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change}>
                        {firstPickedFirst ?
                          firstPickedDate ? firstPickedDate : "날짜 추가"
                          :
                          firstPickedDate ? secondPickedDate ? firstPickedDate : "날짜 추가"
                            :
                            "날짜 추가"}
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <CustomizedDeleteIconButton onClick={resetFunction} top={buttonPosition.top} left={buttonPosition.left} deleteButtonExist={deleteButtonExist}>
                  <CustomziedClearIcon />
                </CustomizedDeleteIconButton>
                <Calendar />
              </CustomizedMenu>


              <CustomizedAdditionalDivider id="secondDivider" orientation="vertical" flexItem change={change} />
              {activeButton === "button3" ?
                <CustomizedAdditionalActiveSearchButton id="activeCheckOutButton" variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} change={change} onClick={handleCheckInOutClick}>
                  <CustomizedAddtionalWhenVerticalWrapperDiv change={change}>
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                      {change ? "체크아웃" : ""}
                    </CustomizedTypography>
                    <CustomizedChangeTypography change={change}>
                      {firstPickedFirst ?
                        secondPickedDate ? secondPickedDate : "날짜 추가"
                        :
                        firstPickedDate ? secondPickedDate ? secondPickedDate : firstPickedDate
                          :
                          "날짜 추가"}
                    </CustomizedChangeTypography>
                  </CustomizedAddtionalWhenVerticalWrapperDiv>
                </CustomizedAdditionalActiveSearchButton>
                :
                <CustomizedAdditionalSearchInsideButton id="inactiveCheckOutButton" change={change} disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => handleButtonClick('button3')}>
                  <CustomizedAddtionalWhenVerticalWrapperDiv change={change}>
                    <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                      {change ? "체크아웃" : ""}
                    </CustomizedTypography>
                    <CustomizedChangeTypography change={change}>
                      {firstPickedFirst ?
                        secondPickedDate ? secondPickedDate : "날짜 추가"
                        :
                        firstPickedDate ? secondPickedDate ? secondPickedDate : firstPickedDate
                          :
                          "날짜 추가"}
                    </CustomizedChangeTypography>
                  </CustomizedAddtionalWhenVerticalWrapperDiv>
                </CustomizedAdditionalSearchInsideButton>
              }
              <CustomizedDivider id="thirdDivider" orientation="vertical" flexItem change={change} />
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
                  {TotalGuestNumber > 0 ?
                    <CustomizedDeleteIconButtonInGuestCount
                      onClick={guestCountReset}
                      top={thirdDivider ? thirdDivider.getBoundingClientRect().top - 5 : 0}
                      left={thirdDivider ? thirdDivider.getBoundingClientRect().left - 10 : 0} >
                      <CustomziedClearIcon />
                    </CustomizedDeleteIconButtonInGuestCount>
                    :
                    null}
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