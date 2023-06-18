import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import AccommodationTextBox from './AccommodationTextBox';

export default function AccommodationNameContents() {
  return (
    <>
      <ContentsTitle>이제 주택에 이름을 지어주세요.</ContentsTitle>
      <ContentsSubText>
        숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니, 너무 걱정하지 마세요.
      </ContentsSubText>
      <AccommodationTextBox limit={32} width={400} height={70} row={3} />
    </>
  );
}
