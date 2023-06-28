import ContentsTitle from '../ContentsTitle';
import ContentsSubText from '../ContentsSubText';
import AccommodationAddPicture from './AccommodationAddPicture';

export default function AccommodationAddPictureContents() {
  return (
    <div>
      <ContentsTitle>숙소 사진 추가하기</ContentsTitle>
      <ContentsSubText>
        숙소 등록을 시작하려면 사진 최소 1장에서 최대5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다.
      </ContentsSubText>
      <AccommodationAddPicture />
    </div>
  );
}
