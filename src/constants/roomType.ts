import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';

// BsDoorOpen;
export interface RoomType {
  all: 'all';
  single: 'single';
  shared: 'shared';
}

export const RoomIconMap: Record<keyof RoomType, JSX.Element> = {
  all: AiOutlineHome({ size: '40px' }),
  single: MdOutlineMeetingRoom({ size: '40px' }),
  shared: IoIosPeople({ size: '40px' }),
};

export const RoomNameMap: Record<keyof RoomType, string> = {
  all: '공간 전체',
  single: '방',
  shared: '다인실',
};

export const RoomContentMap: Record<keyof RoomType, string> = {
  all: '게스트가 숙소 전체를 단독으로 사용합니다.',
  single: '단독으로 사용하는 개인실이 있고, 공용 공간도 있는 형태입니다.',
  shared: '게스트가 개인 공간 없이 호스트나 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.',
};
