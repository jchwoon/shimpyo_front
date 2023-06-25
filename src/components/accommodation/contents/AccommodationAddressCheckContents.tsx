import styled from 'styled-components';
import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import AddressInputContents from './AddressInputContents';

export default function AccommodationAddressCheckContents() {
  return (
    <div>
      <ContentsTitle>주소 확인</ContentsTitle>
      <ContentsSubText>주소는 게스트의 예약이 확정된 이후에 공개됩니다.</ContentsSubText>
      <StyledTmpDiv>
        <AddressInputContents />
      </StyledTmpDiv>
    </div>
  );
}

const StyledTmpDiv = styled.div`
  height: 500px;
`;
