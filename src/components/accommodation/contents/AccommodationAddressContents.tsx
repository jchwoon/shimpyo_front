import styled from 'styled-components';
import AddressSearchBar from './AddressSearchBar';
import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';

export default function AccommodationAddressContents() {
  return (
    <StyledContainer>
      <ContentsTitle>숙소 위치는 어디인가요?</ContentsTitle>
      <ContentsSubText>주소는 게스트의 예약이 확정된 이후에 공개됩니다.</ContentsSubText>
      <StyledPositionDiv>
        <AddressSearchBar />
      </StyledPositionDiv>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 10px;
  height: 380px;
  width: 600px;
`;

const StyledPositionDiv = styled.div`
  position: relative;
`;
