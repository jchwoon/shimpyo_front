import styled from 'styled-components';
import ContentsTitle from '../reuse/ContentsTitle';
import ContentsSubText from '../reuse/ContentsSubText';
import AddressInputContents from './AddressInputContents';

export default function AccommodationAddressCheckContents() {
  return (
    <StyledContainer>
      <ContentsTitle>주소 확인</ContentsTitle>
      <ContentsSubText>주소는 게스트의 예약이 확정된 이후에 공개됩니다.</ContentsSubText>
      <StyledTmpDiv>
        <AddressInputContents />
      </StyledTmpDiv>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 1.2rem;

  @media (min-width: 780px) {
    width: 700px;
  }
`;

const StyledTmpDiv = styled.div`
  height: 500px;
`;
