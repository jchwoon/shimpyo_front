import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import AccommodationCountInfo from './AccommodationCountInfo';

export default function AccommodationCountInfoContents() {
  return (
    <div>
      <ContentsTitle>숙소 기본 정보를 알려주세요.</ContentsTitle>
      <ContentsSubText>최대인원 및 침실과 침대, 욕실의 개수를 정해주세요.</ContentsSubText>
      <AccommodationCountInfo />
    </div>
  );
}
