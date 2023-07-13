import React, { useRef, useEffect, RefObject, useState } from 'react';
// import styled from 'styled-components';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { AiOutlineRight } from 'react-icons/ai';

interface ReviewContentsProps {
    contents?: string
}

const Description = styled.div <{ linelimit: number, seeMore: boolean }>`
// margin-top: 30px;
// margin-bottom:30px;
margin-bottom:${({ seeMore }) => (seeMore ? '5px' : '30px')};
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
// margin-top: 12px;
margin-bottom: 20px;
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
        <>
            <Description ref={ref} linelimit={linelimit} seeMore={seeMore}>
                {contents}
            </Description>
            {seeMore ?
                <SeeMore onClick={handleHSeeMore} disableRipple >
                    {linelimit === 3 ? "자세히 보기" : "간략히"} <AiOutlineRight />
                </SeeMore>
                :
                null}
        </>
    );
};

export default ReviewContent;