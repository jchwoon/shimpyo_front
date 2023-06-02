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
} from "./Navbar.styled"
import Typography from '@mui/material/Typography';
import logo2 from "../../logo2.svg"
import { Divider, ClickAwayListener } from '@mui/material';
import CustomizedMenus from "../LoginModal/LoginModal";
import { useRecoilState } from "recoil";
import { Height, Display, Change } from "../../recoil/atoms";
import { useState } from "react";

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
                  <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
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
                        {change ? "체크인" : "언제든지"}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change}>
                        날짜 추가
                      </CustomizedChangeTypography>
                    </CustomizedWhenVerticalWrapperDiv>
                  </CustomizedSearchInsideButton>
              }
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
                    <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
                      <CustomizedGuestVerticalWrapperDiv change={change}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                          {change ? "여행자" : "게스트 추가"}
                        </CustomizedTypography>
                        <CustomizedChangeTypography change={change}>
                          게스트 추가
                        </CustomizedChangeTypography>
                      </CustomizedGuestVerticalWrapperDiv>
                    </CustomizedActiveSearchButton>
                    :
                    <CustomizedSearchInsideButton change={change} disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => handleButtonClick('button4')}>
                      <CustomizedGuestVerticalWrapperDiv change={change}>
                        <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                          {change ? "여행자" : "게스트 추가"}
                        </CustomizedTypography>
                        <CustomizedChangeTypography change={change}>
                          게스트 추가
                        </CustomizedChangeTypography>
                      </CustomizedGuestVerticalWrapperDiv>
                    </CustomizedSearchInsideButton>
                }
              </CustomizedGuestVerticalWrapperDiv>
              <CustomizedAvatar sx={{ marginLeft: "15px" }} change={change}>
                <CustomizedSearchIcon change={change} />
              </CustomizedAvatar>
            </CustomizedSearchButton>
          </ClickAwayListener>
        </CustomizedSearchButtonWrapperDiv>

        <CustomizedMenus />
      </CustomizedToolBar>
      {/* <CustomizedSearchButtonWrapperDiv change={change}>
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
                <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
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
                      {change ? "체크인" : "언제든지"}
                    </CustomizedTypography>
                    <CustomizedChangeTypography change={change}>
                      날짜 추가
                    </CustomizedChangeTypography>
                  </CustomizedWhenVerticalWrapperDiv>
                </CustomizedSearchInsideButton>
            }
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
                  <CustomizedActiveSearchButton variant="contained" disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
                    <CustomizedGuestVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                        {change ? "여행자" : "게스트 추가"}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change}>
                        게스트 추가
                      </CustomizedChangeTypography>
                    </CustomizedGuestVerticalWrapperDiv>
                  </CustomizedActiveSearchButton>
                  :
                  <CustomizedSearchInsideButton change={change} disableRipple sx={{ paddingLeft: "20px", paddingRight: "20px" }} onClick={() => handleButtonClick('button4')}>
                    <CustomizedGuestVerticalWrapperDiv change={change}>
                      <CustomizedTypography fontFamily='Noto Sans KR' fontWeight="500">
                        {change ? "여행자" : "게스트 추가"}
                      </CustomizedTypography>
                      <CustomizedChangeTypography change={change}>
                        게스트 추가
                      </CustomizedChangeTypography>
                    </CustomizedGuestVerticalWrapperDiv>
                  </CustomizedSearchInsideButton>
              }
            </CustomizedGuestVerticalWrapperDiv>
            <CustomizedAvatar sx={{ marginLeft: "15px" }} change={change}>
              <CustomizedSearchIcon change={change} />
            </CustomizedAvatar>
          </CustomizedSearchButton>
        </ClickAwayListener>
      </CustomizedSearchButtonWrapperDiv> */}
    </CustomizedAppBar>
  )
}