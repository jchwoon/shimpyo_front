import { atom } from 'recoil';
import { Accommodation, ImageItem } from '../constants/accommodation';

export const stepState = atom<number>({
  key: 'stepState',
  default: 0,
});

export const accommodationState = atom<Accommodation>({
  key: 'accommodationState',
  default: {
    name: '',
    type: 'MOTEL',
    option: {
      wifi: false,
      pc: false,
      parking: false,
      bbq: false,
    },
    rooms: [
      {
        name: '',
        price: 0,
        minPeople: 0,
        maxPeople: 0,
        bedCount: 0,
        bedroomCount: 0,
        bathroomCount: 0,
        totalCount: 0,
        checkIn: '',
        checkOut: '',
        imageCount: 0,
      },
    ],
    address: {
      postCode: '',
      sido: '',
      sigungu: '',
      fullAddress: '',
      lat: 0,
      lng: 0,
    },
    contents: '',
  },
});

export const disabledState = atom<boolean>({
  key: 'disabledState',
  default: false,
});

export const addressCheckState = atom<boolean>({
  key: 'addressCheckState',
  default: true,
});

export const errorModalState = atom<boolean>({
  key: 'errorModalState',
  default: false,
});

export const imageDataState = atom<FormData>({
  key: 'imageDataState',
  default: new FormData(),
});

export const imageListState = atom<ImageItem[]>({
  key: 'imageListState',
  default: [{ image: '', isFocused: false }],
});

export const roomImageListState = atom<string[][]>({
  key: 'roomImageListState',
  default: [[]],
});
