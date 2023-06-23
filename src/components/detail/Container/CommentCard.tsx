import styled from '@emotion/styled';
import { Typography, Divider } from '@mui/material';
import { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';

export default function CommentCard() {

    const [lineLimit, setLineLimit] = useState<number>(3);
    const handleHSeeMore = () => {
        if (lineLimit === 3) { setLineLimit(100) } else { setLineLimit(3) }
    }

    return <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
                <UserImg src="https://jmagazine.joins.com/_data/photo/2015/02/3696639864_0BMtU3sK_44.jpg" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <UserName>Name</UserName>
                <CommentDate>YYYY년 M월 D일</CommentDate>
            </div>
        </div>
        <div style={{ width: "90%" }}>
            <Comment lineLimit={lineLimit}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</Comment>
        </div>
        <SeeMore onClick={handleHSeeMore}>
            {lineLimit === 3 ? "자세히 보기" : "간략히"} <AiOutlineRight />
        </SeeMore>
    </div>
}

const Comment = styled.div<{ lineLimit: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lineLimit }) => (lineLimit)};
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

const SeeMore = styled(Typography)`
  font-family: Noto Sans KR;
  font-weight: 400;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  padding-bottom: 30px;
  cursor: pointer;
  color:#acacac;
`;
