import { atom } from 'recoil';
import { Accommodation, ImageItem } from '../constants/accommodation';

export const Height = atom<string>({
  key: 'Height',
  default: '80px',
});

export const Display = atom<boolean>({
  key: 'Display',
  default: false,
});

export const Change = atom<boolean>({
  key: 'Change',
  default: false,
});

export const AdultGuest = atom<number>({
  key: 'AdultGuest',
  default: 0,
});

export const ChildGuest = atom<number>({
  key: 'ChildGuest',
  default: 0,
});

export const InfantGuest = atom<number>({
  key: 'InfantGuest',
  default: 0,
});

export const FirstPickedDate = atom<string | null>({
  key: 'FirstPickedDate',
  default: '',
});

export const SecondPickedDate = atom<string | null>({
  key: 'SecondPickedDate',
  default: '',
});

export const googleMapsPlaceholder = atom<string>({
  key: 'googleMapsPlaceholder',
  default: '',
});

export const PlaceholderChanged = atom<boolean>({
  key: 'PlaceholderChanged',
  default: false,
});

export const activeRoomPrice = atom<number | null>({
  key: 'activeRoomPrice',
  default: null,
});

export const activeRoomName = atom<string>({
  key: 'activeRoomName',
  default: '',
});

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export const objectPlaceholder = atom<PlaceType>({
  key: 'objectPlaceholder',
  default: {
    description: '',
    structured_formatting: {
      main_text: '',
      secondary_text: '',
      main_text_matched_substrings: [],
    },
  },
});
export const stepState = atom<number>({
  key: 'stepState',
  default: 0,
});

export const accommodationState = atom<Accommodation>({
  key: 'accommodationState',
  default: {
    name: '',
    type: '',
    option: {
      wifi: false,
      pc: false,
      parking: false,
      bbq: false,
    },
    room: [
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

export const isPassedState = atom<boolean>({
  key: 'isPassedState',
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
  default: [
    { image: '', isFocused: false },
    { image: '', isFocused: false },
    { image: '', isFocused: false },
    { image: '', isFocused: false },
  ],
});

export const roomImageListState = atom<string[][]>({
  key: 'roomImageListState',
  default: [[]],
});
