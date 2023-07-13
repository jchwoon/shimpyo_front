import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import 'moment/locale/ko';
import ReviewContent from './ReviewContent';

interface CommentCardProps {
    contents?: string;
    image?: string | null;
    name?: string;
    date?: string;
}

export default function CommentCard({ image, name, contents, date }: CommentCardProps) {

    const [linelimit, setLineLimit] = useState<number>(3);
    const handleHSeeMore = () => {
        if (linelimit === 3) { setLineLimit(100) } else { setLineLimit(3) }
    }

    return <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
                <UserImg src={image ? image : "./images/basicProfile.jpg"} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <UserName>{name}</UserName>
                <CommentDate>{moment(date).format('M월 D일')}</CommentDate>
            </div>
        </div>
        <Grid container>
            <Grid item xs={12} md={9} >
                <ReviewContent
                    contents={contents}
                // contents={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                />
            </Grid>
        </Grid>
    </div>
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
`;

const CommentDate = styled(Typography)`
font-family: Noto Sans KR;
font-weight: 300;
font-size: 12px;
color:#c5c5c5;
`;

const UserImg = styled.img`
  width: 35px;
  height: 35px;
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
