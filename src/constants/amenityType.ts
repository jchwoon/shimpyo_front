import { AiOutlineWifi } from 'react-icons/ai';
import { MdTv } from 'react-icons/md';
import { BsFillCarFrontFill } from 'react-icons/bs';
import { TbGrill } from 'react-icons/tb';
import { GiPc } from 'react-icons/gi';

export interface AmenityType {
  wifi: boolean;
  parking: boolean;
  bbq: boolean;
  pc: boolean;
  tv: boolean;
}

export const AmenityIconMap: Record<keyof AmenityType, JSX.Element> = {
  wifi: AiOutlineWifi({ size: '40px' }),
  parking: BsFillCarFrontFill({ size: '40px' }),
  bbq: TbGrill({ size: '40px' }),
  pc: GiPc({ size: '40px' }),
  tv: MdTv({ size: '40px' }),
};

export const AmenityNameMap: Record<keyof AmenityType, string> = {
  wifi: '무선 인터넷',
  parking: '주차 가능',
  bbq: '바베큐 그릴',
  pc: 'PC',
  tv: 'TV',
};
