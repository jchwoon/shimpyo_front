import styled from 'styled-components';
import ContentsTitle from '../ContentsTitle';
import ContentsSubText from '../ContentsSubText';
import AccommodationTextBox from './AccommodationTextBox';

export default function AccommodationDetailContents() {
  return (
    <StyledContainer>
      <ContentsTitle>숙소 설명 작성하기</ContentsTitle>
      <ContentsSubText>숙소의 특징과 장점을 알려주세요.</ContentsSubText>
      <AccommodationTextBox title={'contents'} limit={500} width={500} height={180} row={6} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 10px;
  width: 600px;
`;
