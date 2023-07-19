import React, { useRef, useEffect, RefObject, useState } from 'react';
// import styled from 'styled-components';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { AiOutlineRight } from 'react-icons/ai';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

interface ReviewContentsProps {
    contents?: string
}

const Description = styled.div <{ linelimit: number, seeMore: boolean }>`
margin-top: 10px;
margin-bottom:10px;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: ${({ linelimit }) => (linelimit)};
word-break: break-all;
overflow: hidden;
text-overflow: ellipsis;
font-family: Noto Sans KR;
`;

const SeeMore = styled(Button)`
font-family: Noto Sans KR;
font-weight: 400;
display: flex;
align-items: center;
text-align: center;
margin-left:10px;
// margin-bottom: 20px;
cursor: pointer;
color:#acacac;
&:hover{
background-color:white;
}
`;

const ReviewContent = ({ contents }: ReviewContentsProps) => {

    const [linelimit, setLineLimit] = useState<number>(3);
    const [seeMore, setSeeMore] = useState(false)

    const checkOverflow = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            const isOverflowed = ref.current.offsetHeight < ref.current.scrollHeight;
            if (isOverflowed) {
                setSeeMore(true)
            } else {
                setSeeMore(false)
            }
        }
    };

    const ref = useRef<HTMLDivElement>(null);

    const handleHSeeMore = () => {
        if (linelimit === 3) { setLineLimit(10) } else { setLineLimit(3) }
    }

    useEffect(() => {
        checkOverflow(ref);
    }, [contents]);

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginRight: "10px" }}><FaQuoteLeft size={8} color='#acacac' /></div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Description ref={ref} linelimit={linelimit} seeMore={seeMore}>
                        {contents}
                    </Description>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", marginLeft: "10px" }}>
                    <FaQuoteRight size={8} color='#acacac' />
                </div>
            </div>
            {seeMore ?
                <SeeMore onClick={handleHSeeMore} disableRipple >
                    {linelimit === 3 ? "자세히 보기" : "간략히"} <AiOutlineRight />
                </SeeMore>
                :
                null}
        </div>
    );
};

export default ReviewContent;