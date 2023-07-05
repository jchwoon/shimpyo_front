import { RoomType } from '../../../../constants/roomType';
import RoomTypeItem from './RoomTypeItem';
import ContentsTitle from '../reuse/ContentsTitle';
import { useState } from 'react';

export default function RoomTypeContents() {
  const typeList: (keyof RoomType)[] = ['all', 'single', 'shared'];
  const [selectedType, setSelectedType] = useState<keyof RoomType>('all');
  const handleTypeClick = (type: keyof RoomType) => {
    setSelectedType(type);
  };
  return (
    <div>
      <ContentsTitle>게스트가 사용할 숙소 유형</ContentsTitle>
      {typeList.map(type => (
        <RoomTypeItem key={type} type={type} isSelected={selectedType === type} onClick={handleTypeClick} />
      ))}
    </div>
  );
}
