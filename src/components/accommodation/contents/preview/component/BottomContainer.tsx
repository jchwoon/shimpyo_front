import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import CommentCard from '../../../../detail/Container/CommentCard';

export default function BottomContainer() {
  return (
    <>
      <MainTitle>후기</MainTitle>
      <CommentCardContainer>
        {[1, 2].map(i => {
          return <CommentCard key={i} />;
        })}
      </CommentCardContainer>
    </>
  );
}

const MainTitle = styled(Typography)`
  padding: 48px 0 24px 0;
  font-size: 22px;
  font-weight: 600;
  font-family: Noto Sans KR;
`;

const CommentCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  flex-direction: column;
`;
