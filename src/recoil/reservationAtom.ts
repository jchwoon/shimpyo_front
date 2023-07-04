import { atom } from 'recoil';

export const isOverCheckInAtom = atom<boolean>({
  key: 'isOverCheckInAtom',
  default: false,
});
