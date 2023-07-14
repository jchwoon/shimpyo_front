import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import 'moment/locale/ko';
import ReviewContent from './ReviewContent';
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from 'react-icons/hi'

interface CommentCardProps {
    contents?: string;
    image?: string | null;
    name?: string;
    date?: string;
    rating?: string;
}

export default function CommentCard({ image, name, contents, date, rating }: CommentCardProps) {

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", paddingBottom: "20px" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <div style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
                    <UserImg src={image ? image : "./images/basicProfile.jpg"} />
                    {/* <UserImg src={"./images/basicProfile.jpg"} /> */}
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginRight: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <UserName noWrap>{name}</UserName>
                    </div>
                    <CommentDate noWrap>{moment(date).format('M월 D일')}</CommentDate>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: "20px" }}>
                    {rating === "GOOD" ?
                        <>
                            <Typography fontFamily="Noto Sans KR" fontSize="15px" color="#00adb5" fontWeight="500" noWrap>좋아요</Typography>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                                <HiOutlineEmojiHappy style={{ color: "#00adb5", height: "20px", width: "20px" }} />
                                <AiOutlinePlus style={{ color: "#00adb5", height: "8px", width: "8px" }} />
                            </div>
                        </>
                        :
                        <>
                            <Typography fontFamily="Noto Sans KR" fontSize="15px" color="#e80a00" fontWeight="500" noWrap>싫어요</Typography>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                                <HiOutlineEmojiSad style={{ color: "#e80a00", height: "20px", width: "20px" }} />
                                <AiOutlineMinus style={{ color: "#e80a00", height: "8px", width: "8px" }} />
                            </div>
                        </>
                    }
                </div>
            </div>
            <Grid container>
                <Grid item xs={12} md={9} >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                        <ReviewContent
                            contents={contents}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

const Comment = styled.div<{ linelimit: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ linelimit }) => (linelimit)};
  overflow: hidden;
  font-family: Noto Sans KR;
`;


const UserName = styled(Typography)`
font-family: Noto Sans KR;
font-weight: 500;
font-size: 12px;
`;

const CommentDate = styled(Typography)`
font-family: Noto Sans KR;
font-weight: 300;
font-size: 12px;
color:#c5c5c5;
`;

const UserImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  object-fit: cover;
`;

const SeeMore = styled(Button)`
  font-family: Noto Sans KR;
  font-weight: 400;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 30px;
  cursor: pointer;
  color:#acacac;
  &:hover{
    background-color:white;
  }
`;
