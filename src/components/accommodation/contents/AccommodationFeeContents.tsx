import ContentsTitle from './ContentsTitle';
import ContentsSubText from './ContentsSubText';
import AccommodationSettingFeeBox from './AccommodationSettingFeeBox';

export default function AccommodationFeeContents() {
  return (
    <>
      <ContentsTitle>이제 요금을 설정하세요.</ContentsTitle>
      <ContentsSubText>언제든지 변경하실 수 있습니다.</ContentsSubText>
      <AccommodationSettingFeeBox />
    </>
  );
}
