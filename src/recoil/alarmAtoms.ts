import { atom } from 'recoil';

export const reviewModifiedAlarmAtoms = atom<boolean>({
  key: 'reviewModifiedAlarmAtoms',
  default: false,
});

export const reviewCompleteAlarmAtoms = atom<boolean>({
  key: 'reviewCompleteAlarmAtoms',
  default: false,
});

export const copyAddressAlarmAtoms = atom<boolean>({
  key: 'copyAddressAlarmAtoms',
  default: false,
});
