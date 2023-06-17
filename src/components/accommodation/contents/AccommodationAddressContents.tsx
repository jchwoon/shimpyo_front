import AddressSearchBar from './AddressSearchBar';
import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import AddressInputContents from './AddressInputContents';

export default function AccommodationAddressContents() {
  return (
    <>
      <ContentsTitle>숙소 위치는 어디인가요?</ContentsTitle>
      <ContentsSubText>주소는 게스트의 예약이 확정된 이후에 공개됩니다.</ContentsSubText>
      <AddressSearchBar />
      <AddressInputContents />
    </>
  );
}
