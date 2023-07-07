import ContentsTitle from '../reuse/ContentsTitle';
import ContentsSubText from '../reuse/ContentsSubText';
import AccommodationSettingFeeBox from './AccommodationSettingFeeBox';

export default function AccommodationFeeContents() {
  return (
    <div>
      <ContentsTitle>이제 요금을 설정하세요.</ContentsTitle>
      <ContentsSubText>언제든지 변경하실 수 있습니다.</ContentsSubText>
      <AccommodationSettingFeeBox />
    </div>
  );
}
