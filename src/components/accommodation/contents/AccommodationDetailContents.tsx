import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import AccommodationTextBox from './AccommodationTextBox';

export default function AccommodationDetailContents() {
  return (
    <>
      <ContentsTitle>숙소 설명 작성하기</ContentsTitle>
      <ContentsSubText>숙소의 특징과 장점을 알려주세요.</ContentsSubText>
      <AccommodationTextBox limit={500} width={500} height={180} row={6} />
    </>
  );
}
