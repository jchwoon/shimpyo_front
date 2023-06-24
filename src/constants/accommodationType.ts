import { LuBuilding } from 'react-icons/lu';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsHouses, BsHouse } from 'react-icons/bs';

export interface AccommodationType {
  MOTEL: 'MOTEL';
  HOTEL: 'HOTEL';
  PENSION: 'PENSION';
  GUEST: 'GUEST';
}

export const AccommodationIconMap: Record<keyof AccommodationType, JSX.Element> = {
  MOTEL: LuBuilding({ size: '50px' }),
  HOTEL: HiOutlineOfficeBuilding({ size: '50px' }),
  PENSION: BsHouses({ size: '50px' }),
  GUEST: BsHouse({ size: '50px' }),
};

export const AccommodationNameMap: Record<keyof AccommodationType, string> = {
  MOTEL: '모텔',
  HOTEL: '호텔',
  PENSION: '펜션',
  GUEST: '게스트하우스',
};
