import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const StyledDaysDiv = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
`

const StyledDayDiv = styled.div`
// height: 50px;
// width: 50px;

height: 35px;
width: 35px;

display:flex;
justify-content: center;
align-items: center;
`

export const Days = () => {

    const days = []
    const date = ["일", "월", "화", "수", "목", "금", "토"]

    for (let i = 0; i < 7; i++) {
        days.push(
            <StyledDayDiv key={i}>
                <Typography fontFamily='Noto Sans KR' fontWeight="300" fontSize="14px">
                    {date[i]}
                </Typography>
            </StyledDayDiv>
        )
    }
    return (
        <StyledDaysDiv>
            {days}
        </StyledDaysDiv>
    )
}