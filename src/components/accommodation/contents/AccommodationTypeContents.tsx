import { useState } from 'react';
import { AccommodationType } from '../../../constants/accommodationType';
import AccommodationTypeItem from './AccommodationTypeItem';
import ContentsTitle from './ContentsTitle';

export default function AccommodationTypeContents() {
  const typeList: (keyof AccommodationType)[] = ['house', 'apartment', 'hotel', 'woodhouse'];
  const [selectedType, setSelectedType] = useState<keyof AccommodationType>('house');

  const handleClick = (type: keyof AccommodationType) => {
    setSelectedType(type);
  };

  return (
    <>
      <ContentsTitle>다음 중 숙소를 가장 잘 설명하는 것은 무엇인가요?</ContentsTitle>
      {typeList.map(type => (
        <AccommodationTypeItem type={type} key={type} isSelected={selectedType === type} onClick={handleClick} />
      ))}
    </>
  );
}
