import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { RoomCard } from "../RoomCard";
import { createGlobalStyle } from "styled-components";
import { useState } from "react";

export default function SideBox() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <Container>
                <Typography>
                    요금 세부정보
                </Typography>
                <HotelRoomContainer>
                    <DarkDiv className="hoverTrigger"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CustomizedHotelTypography>Title</CustomizedHotelTypography>
                        <CustomizedHotelExplainDiv >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</CustomizedHotelExplainDiv>
                    </DarkDiv>
                    <HotelImage
                        src="https://source.unsplash.com/random?wallpapers"
                        className="hoverTrigger"
                    />
                    <RoomCard name={"디럭스룸"} doubleBed={1} bedroom={1} shower={1} person={4} price={50000} isHovered={isHovered} />
                </HotelRoomContainer>
            </Container>
        </>
    );
}


const Container = styled.div`
display:flex;
flex-direction:column;
border:solid;
width: 50%;
padding: 20px;
`

const DarkDiv = styled.div`
width: calc(100% - 20px);
height: 150px;
position: absolute;
top:0px;
left:0px;
margin-left:20px;
border-radius: 20px 20px 20px 0px;
background-color: rgba(0, 0, 0, 0.3);
padding:30px;
`
const CustomizedHotelTypography = styled(Typography)`
font-family:Noto Sans KR;
font-weight:500;
font-size: 15px;
color: #e5e5e5;
`

const CustomizedHotelExplainDiv = styled.div`
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
font-family: Noto Sans KR;
font-size:13px;
font-weight:500;
color: #e5e5e5;
`

const HotelImage = styled.img`
width: calc(100% - 20px);
height: 150px;
object-fit: cover;
border-radius: 20px 20px 20px 0px;
margin-left:20px;
`;

const HotelImageWrapper = styled.div`
width: calc(100% - 20px);
height: 150px;
border-radius: 20px 20px 20px 0px;
overflow:hidden;
margin-left:20px;
`

const HoverDiv = styled.div`
background-color: rgba(0, 0, 0, 0.5);
position: absolute;
top:0;
left:0;
width:100%;
height:100%;
color:white;
`

const RoomlImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
//   border-radius: 20px 0 0 20px;
//   @media screen and (max-width: 750px){
//     border-radius: 20px 20px 20px 20px;
//   };
`;

const HotelRoomContainer = styled.div`
position:relative;
`
