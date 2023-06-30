import {
  CustomizedLogoTypography,
  CustomizedAvatar,
  CustomizedDivider,
  CustomizedAdditionalDivider,
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
  CustomizedDeleteIconButtonInGuestCount,
  CustomizedWhereActiveSearchButton,
} from './Navbar.styled';
import logo2 from '../../../../public/images/logo2.svg'
import { Divider, ClickAwayListener, Collapse } from '@mui/material';
import CustomizedMenus from '../UserMenu/UserMenu';
import { useRecoilState } from 'recoil';
import {
  Height,
  Display,
  Change,
  AdultGuest,
  ChildGuest,
  InfantGuest,
  FirstPickedDate,
  SecondPickedDate,
  PlaceholderChanged,
  objectPlaceholder
} from '../../../recoil/atoms';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';

import { Calendar } from '../Calendar/Calendar';

import { GuestCountAdult, GuestCountChild, GuestCountInfant } from './GuestCount';

import MuiSearchField from './MuiSearchField';

import CategoryTabs from "./Tabs"

export default function Navbar() {
  const [appbarheight, setAppBarHeight] = useRecoilState(Height);
  const [customDisplay, setCustomDisplay] = useRecoilState(Display);
  const [change, setChange] = useRecoilState(Change);
  const [firstPickedDate, setFirstPickedDate] = useRecoilState(FirstPickedDate);
  const [secondPickedDate, setSecondPickedDate] = useRecoilState(SecondPickedDate);
  const [ObjectPlaceholder, setObjectPlaceholder] = useRecoilState(objectPlaceholder);

  const handleClick = () => {
    setAppBarHeight('160px');
    setCustomDisplay(true);
    setChange(true);
  };

  const [activebutton, setActiveButton] = useState('');
  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const clickAwayHandler = () => {
    if (activebutton !== '') {
      setActiveButton('');
    }
  };

  //checkInOut menu

  const customizedSearchButton = document.getElementById('customizedSearchButton');

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
  const TotalGuestNumber = AdultGuestNumber + ChildGuestNumber;
  if (InfantGuestNumber > 0 && AdultGuestNumber === 0) {
    setAdultGuestNumber(prevValue => prevValue + 1);
  }
  const TotalGuestNumberCount =
    InfantGuestNumber === 0
      ? `게스트 ${TotalGuestNumber}명`
      : `게스트 ${TotalGuestNumber} 명, 유아 ${InfantGuestNumber}명 `;

  const guestCountReset = () => {
    setAdultGuestNumber(0);
    setChildGuestNumber(0);
    setInfantGuestNumber(0);
  };

  //calendar delete button
  const resetFunction = () => {
    setFirstPickedDate('');
    setSecondPickedDate('');
    if (firstPickedFirst) {
      handleButtonClick('button2');
    }
    if (!firstPickedFirst) {
      handleButtonClick('button3');
    }
  };

  const [buttonPosition, setButtonPostion] = useState({ top: 0, left: 0 });

  const firstDivider = document.getElementById('firstDivider');
  const secondDivider = document.getElementById('secondDivider');
  const thirdDivider = document.getElementById('thirdDivider');

  //searchfield delete button

  const [placeholderChanged, setPlaceholderChanged] = useRecoilState(PlaceholderChanged);
  const [textfieldInputValue, setTextfieldInputValue] = useState(false);

  const resetFunctionInSearchField = () => {
    setPlaceholderChanged(false);
    setTextfieldInputValue(false);
    setObjectPlaceholder(
      {
        description: "",
        structured_formatting: {
          main_text: "",
          secondary_text: "",
          main_text_matched_substrings: []
        }
      }
    )
  };

  useEffect(() => {
    const updateButtonPosition = () => {
      if (activebutton === 'button2') {
        if (firstDivider) {
          const { top, left } = firstDivider.getBoundingClientRect();
          setButtonPostion({ top: top - 10, left: left - 10 });
        }
      }
      if (activebutton === 'button3') {
        if (secondDivider) {
          const { top, left } = secondDivider.getBoundingClientRect();
          setButtonPostion({ top: top - 10, left: left - 10 });
        }
      }
    };
    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
  }, [activebutton, checkInOutOpen]);

  //calendar date order
  const [firstPickedFirst, setFirstPickedFirst] = useState(true);

  useEffect(() => {
    if (activebutton === 'button3' && firstPickedFirst === true && checkInOutOpen === false) {
      //정상 순서에서 calendar가 나오기 전 button2에서 button3로 변경할 때 반대 순서로 변경
      setFirstPickedFirst(false);
    }
  }, [activebutton, firstPickedFirst]);

  useEffect(() => {
    if (activebutton === 'button2' && firstPickedFirst === false && checkInOutOpen === false) {
      //반대 순서에서 calendar가 나오기 전 button3에서 button2로 변경할 때 정상 순서로 변경
      setFirstPickedFirst(true);
    }
  }, [activebutton, firstPickedFirst]);

  if (
    activebutton === 'button3' &&
    firstPickedFirst === false &&
    firstPickedDate &&
    !secondPickedDate &&
    checkInOutOpen === true
  ) {
    //반대 순서에서 calendar가 나온 이후 button3에서 button2로 active 변경
    handleButtonClick('button2');
  }

  if (
    activebutton === 'button2' &&
    firstPickedFirst === true &&
    firstPickedDate &&
    !secondPickedDate &&
    checkInOutOpen === true
  ) {
    //정상 순서에서 calendar가 나온 이후 button2에서 button3으로 active 변경
    handleButtonClick('button3');
  }

  return (
    <CustomizedAppBar elevation={0} appbarheight={appbarheight}>
      <CustomizedToolBar>
        <LogoButton disableRipple>
          <img src="images/logo2.svg" alt="website logo" style={{ height: 13, marginBottom: 5 }} />
          <CustomizedLogoTypography>쉼표</CustomizedLogoTypography>
        </LogoButton>
        <CustomizedSearchButtonWrapperDiv change={change.toString()}>
          <ClickAwayListener onClickAway={clickAwayHandler}>
            <div>
              {change ? <CategoryTabs /> : null}
              <CustomizedSearchButton
                id="customizedSearchButton"
                onClick={handleClick}
                change={change.toString()}
                activebutton={activebutton}
                elevation={2}
              >
                {!change ? (
                  <div
                    onClick={() => handleButtonClick('button1')}
                    style={{ height: '50px', display: 'flex', alignItems: 'center' }}
                  >
                    <CustomizedTypography
                      fontFamily="Noto Sans KR"
                      fontWeight="500"
                      textAlign="left"
                      sx={{ paddingLeft: '20px', paddingRight: '15px' }}
                    >
                      어디든지
                    </CustomizedTypography>
                  </div>
                ) : activebutton === 'button1' ? (
                  <>
                    <CustomizedWhereActiveSearchButton elevation={2} style={{ paddingLeft: '20px' }}>
                      <CustomizedWhereVerticalWrapperDiv >
                        <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500" textAlign="left">
                          여행지
                        </CustomizedTypography>
                        <MuiSearchField
                          textfieldInputValue={textfieldInputValue}
                          setTextfieldInputValue={setTextfieldInputValue}
                          ObjectPlaceholder={ObjectPlaceholder}
                          setObjectPlaceholder={setObjectPlaceholder}
                        />

                      </CustomizedWhereVerticalWrapperDiv>
                    </CustomizedWhereActiveSearchButton>
                  </>
                ) : (
                  <CustomizedSearchInsideButton
                    disableRipple
                    sx={{ paddingLeft: '20px' }}
                    onClick={() => handleButtonClick('button1')}
                  >
                    <CustomizedWhereVerticalWrapperDiv >
                      <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500" textAlign="left">
                        여행지
                      </CustomizedTypography>
                      <CustomizedTypography fontFamily="Noto Sans KR" color="#a2a2a2" fontSize="15px" fontWeight="300">
                        {ObjectPlaceholder.description ? ObjectPlaceholder.description : '여행지 검색'}
                      </CustomizedTypography>
                    </CustomizedWhereVerticalWrapperDiv>
                  </CustomizedSearchInsideButton>
                )}
                <CustomizedDivider id="firstDivider" orientation="vertical" flexItem variant="middle" />
                {!change ? (
                  <div
                    onClick={() => {
                      handleButtonClick('button2');
                    }}
                    style={{ height: '50px', display: 'flex', alignItems: 'center' }}
                  >
                    <CustomizedTypography
                      fontFamily="Noto Sans KR"
                      fontWeight="500"
                      sx={{ paddingLeft: '15px', paddingRight: '15px' }}
                    >
                      언제든지
                    </CustomizedTypography>
                  </div>
                ) : activebutton === 'button2' ? (
                  <CustomizedActiveSearchButton
                    id="activeCheckInButton"
                    variant="contained"
                    disableRipple
                    sx={{ paddingLeft: '20px', paddingRight: '20px' }}
                    onClick={handleCheckInOutClick}
                  >
                    <CustomizedWhenVerticalWrapperDiv>
                      <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500">
                        {change ? '체크인' : '언제든지'}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change.toString()}>
                        {firstPickedFirst
                          ? firstPickedDate
                            ? moment(firstPickedDate).format('M월 D일')
                            : '날짜 추가'
                          : firstPickedDate
                            ? secondPickedDate
                              ? moment(firstPickedDate).format('M월 D일')
                              : '날짜 추가'
                            : '날짜 추가'}
                      </CustomizedChangeTypography>
                    </CustomizedWhenVerticalWrapperDiv>
                  </CustomizedActiveSearchButton>
                ) : (
                  <CustomizedSearchInsideButton
                    id="inactiveCheckInButton"
                    disableRipple
                    sx={{ paddingLeft: '20px', paddingRight: '20px' }}
                    onClick={() => handleButtonClick('button2')}
                  >
                    <CustomizedWhenVerticalWrapperDiv >
                      <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500">
                        체크인
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change.toString()}>
                        {firstPickedFirst
                          ? firstPickedDate
                            ? moment(firstPickedDate).format('M월 D일')
                            : '날짜 추가'
                          : firstPickedDate
                            ? moment(secondPickedDate).format('M월 D일')
                              ? moment(firstPickedDate).format('M월 D일')
                              : '날짜 추가'
                            : '날짜 추가'}
                      </CustomizedChangeTypography>
                    </CustomizedWhenVerticalWrapperDiv>
                  </CustomizedSearchInsideButton>
                )}
                <CustomizedMenu
                  id="calendar-menu"
                  anchorEl={checkInOutAnchorEl}
                  open={checkInOutOpen}
                  onClose={checkInOutClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  elevation={1}
                >
                  {
                    firstPickedDate ?
                      <CustomizedDeleteIconButton
                        onClick={resetFunction}
                        top={-15}
                        left={-10}
                      >
                        <CustomziedClearIcon />
                      </CustomizedDeleteIconButton>
                      :
                      null
                  }
                  <Calendar />
                </CustomizedMenu>

                <CustomizedAdditionalDivider
                  id="secondDivider"
                  orientation="vertical"
                  flexItem
                  change={change.toString()}
                  variant="middle"
                />
                {activebutton === 'button3' ? (
                  <CustomizedAdditionalActiveSearchButton
                    id="activeCheckOutButton"
                    variant="contained"
                    disableRipple
                    sx={{ paddingLeft: '20px', paddingRight: '20px' }}
                    change={change.toString()}
                    onClick={handleCheckInOutClick}
                  >
                    <CustomizedAddtionalWhenVerticalWrapperDiv change={change.toString()}>
                      <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500">
                        {change ? '체크아웃' : ''}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change.toString()}>
                        {firstPickedFirst
                          ? secondPickedDate
                            ? moment(secondPickedDate).format('M월 D일')
                            : '날짜 추가'
                          : firstPickedDate
                            ? secondPickedDate
                              ? moment(secondPickedDate).format('M월 D일')
                              : moment(firstPickedDate).format('M월 D일')
                            : '날짜 추가'}
                      </CustomizedChangeTypography>
                    </CustomizedAddtionalWhenVerticalWrapperDiv>
                  </CustomizedAdditionalActiveSearchButton>
                ) : (
                  <CustomizedAdditionalSearchInsideButton
                    id="inactiveCheckOutButton"
                    change={change.toString()}
                    disableRipple
                    sx={{ paddingLeft: '20px', paddingRight: '20px' }}
                    onClick={() => handleButtonClick('button3')}
                  >
                    <CustomizedAddtionalWhenVerticalWrapperDiv change={change.toString()}>
                      <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500">
                        {change ? '체크아웃' : ''}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change.toString()}>
                        {firstPickedFirst
                          ? secondPickedDate
                            ? moment(secondPickedDate).format('M월 D일')
                            : '날짜 추가'
                          : firstPickedDate
                            ? secondPickedDate
                              ? moment(secondPickedDate).format('M월 D일')
                              : moment(firstPickedDate).format('M월 D일')
                            : '날짜 추가'}
                      </CustomizedChangeTypography>
                    </CustomizedAddtionalWhenVerticalWrapperDiv>
                  </CustomizedAdditionalSearchInsideButton>
                )}
                <CustomizedDivider id="thirdDivider" orientation="vertical" flexItem variant="middle" />
                <CustomizedGuestVerticalWrapperDiv >
                  {!change ? (
                    <div
                      onClick={() => handleButtonClick('button4')}
                      style={{ height: '50px', display: 'flex', alignItems: 'center' }}
                    >
                      <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500" sx={{ paddingLeft: '20px' }}>
                        게스트 추가
                      </CustomizedTypography>
                    </div>
                  ) : activebutton === 'button4' ? (
                    <CustomizedActiveSearchButton
                      variant="contained"
                      disableRipple
                      sx={{ paddingLeft: '20px', paddingRight: '20px' }}
                      onClick={handleGuestCountClick}
                    >
                      <CustomizedGuestVerticalWrapperDiv >
                        <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500">
                          여행자
                        </CustomizedTypography>
                        <CustomizedChangeTypography change={change.toString()}>
                          {TotalGuestNumber > 0 ? TotalGuestNumberCount : '게스트 추가'}
                        </CustomizedChangeTypography>
                      </CustomizedGuestVerticalWrapperDiv>
                    </CustomizedActiveSearchButton>
                  ) : (
                    <CustomizedSearchInsideButton
                      disableRipple
                      sx={{ paddingLeft: '20px', paddingRight: '20px' }}
                      onClick={() => handleButtonClick('button4')}
                    >
                      <CustomizedGuestVerticalWrapperDiv>
                        <CustomizedTypography fontFamily="Noto Sans KR" fontWeight="500">
                          여행자
                        </CustomizedTypography>
                        <CustomizedChangeTypography change={change.toString()}>
                          {TotalGuestNumber > 0 ? TotalGuestNumberCount : '게스트 추가'}
                        </CustomizedChangeTypography>
                      </CustomizedGuestVerticalWrapperDiv>
                    </CustomizedSearchInsideButton>
                  )}
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
                    {TotalGuestNumber > 0 ? (
                      <CustomizedDeleteIconButtonInGuestCount
                        onClick={guestCountReset}
                        top={-15}
                        left={-10}
                      >
                        <CustomziedClearIcon />
                      </CustomizedDeleteIconButtonInGuestCount>
                    ) : null}
                  </CustomizedMenu>

                </CustomizedGuestVerticalWrapperDiv>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                  <CustomizedAvatar sx={{ marginLeft: '15px' }} change={change.toString()}>
                    <CustomizedSearchIcon change={change.toString()} />
                  </CustomizedAvatar>
                </div>
              </CustomizedSearchButton>
            </div>
          </ClickAwayListener>
        </CustomizedSearchButtonWrapperDiv>

        <CustomizedMenus />
      </CustomizedToolBar>
    </CustomizedAppBar >
  );
}
