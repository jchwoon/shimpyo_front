import { atom } from 'recoil';
import { Accommodation } from '../constants/accommodation';

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

export const joinModalAtom = atom<boolean>({
  key: 'joinModalAtom',
  default: false,
});

export const additionalInfoModalAtom = atom<boolean>({
  key: 'additionalInfoModalAtom',
  default: false,
});

export const idFindModalAtom = atom<boolean>({
  key: 'idFindModalAtom',
  default: false,
});

export const passwordFindModalAtom = atom<boolean>({
  key: 'passwordFindModalAtom',
  default: false,
});

export const loginModalAtom = atom<boolean>({
  key: 'loginModalAtom',
  default: false,
});

export const passwordValueAtom = atom<string>({
  key: 'PasswordValueState',
  default: '',
});

export const confirmPasswordValueAtom = atom<string>({
  key: 'confirmPasswordValueAtom',
  default: '',
});

export const nicknameValueAtom = atom<string>({
  key: 'nicknameValueAtom',
  default: '',
});

export const emailValueAtom = atom<string>({
  key: 'emailValueAtom',
  default: '',
});

export const phoneValueAtom = atom<string>({
  key: 'phoneValueAtom',
  default: '',
});

export const accessTokenAtom = atom<string>({
  key: 'accessTokenAtom',
  default: '',
});

export const profileImageAtom = atom<string>({
  key: 'profileImageAtom',
  default: '',
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
  default: true,
});
