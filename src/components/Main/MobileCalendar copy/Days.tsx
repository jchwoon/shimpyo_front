import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const StyledDaysDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledDayDiv = styled.div`
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Days = () => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  const days = date.map((day, index) => (
    <StyledDayDiv key={index}>
      <Typography fontFamily='Noto Sans KR' fontWeight="300">
        {day}
      </Typography>
    </StyledDayDiv>
  ));

  return <StyledDaysDiv>{days}</StyledDaysDiv>;
};
