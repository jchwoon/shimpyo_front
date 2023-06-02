import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { FaHotel } from 'react-icons/fa';
import { GiWoodCabin } from 'react-icons/gi';

export interface AccommodationType {
  house: 'house';
  apartment: 'apartment';
  hotel: 'hotel';
  woodhouse: 'woodhouse';
}

export const AccommodationIconMap: Record<keyof AccommodationType, JSX.Element> = {
  house: AiOutlineHome({ size: '50px' }),
  apartment: HiOutlineBuildingOffice2({ size: '50px' }),
  hotel: FaHotel({ size: '50px' }),
  woodhouse: GiWoodCabin({ size: '50px' }),
};

export const AccommodationNameMap: Record<keyof AccommodationType, string> = {
  house: '주택(예: 펜션, 한옥 등)',
  apartment: '아파트',
  hotel: '호텔',
  woodhouse: '통나무집',
};
