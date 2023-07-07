import styled from 'styled-components';

import ContentsSubText from '../reuse/ContentsSubText';
import ContentsTitle from '../reuse/ContentsTitle';
import DetailStaticItem from './DetailStaticItem';

export default function DetailStaticContents() {
  return (
    <StyledContainer>
      <ContentsTitle>숙소 미리보기</ContentsTitle>
      <ContentsSubText>
        작성한 숙소에 대한 정보를 다시 한번 확인하고, 실제 서비스하는 페이지 모습을 미리 확인하세요.
      </ContentsSubText>
      <DetailStaticItem />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 1.2rem;
  @media (min-width: 780px) {
    padding: 2rem 6rem;
  }
`;
