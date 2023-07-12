import { atom } from 'recoil';
import { AccommodationDataType, RoomDataType } from '../components/Hosting/HostingMain';

export const selectedAccommodationIdState = atom<number>({
  key: 'selectedAccommodationIdState',
  default: 0,
});

export const originalAccommodationListState = atom<AccommodationDataType[]>({
  key: 'originalAccommodationListState',
  default: [],
});

export const originalRoomListState = atom<RoomDataType[]>({
  key: 'originalRoomListState',
  default: [],
});

export const roomListTotalPageState = atom<number>({
  key: 'roomListTotalPageState',
  default: 0,
});

export const roomReservationStatusState = atom<string>({
  key: 'roomReservationStatusState',
  default: 'USING',
});

export const roomListPageState = atom<number>({
  key: 'roomListPageState',
  default: 0,
});

export const roomListTotalElementState = atom<number>({
  key: 'roomListTotalElementState',
  default: 0,
});
