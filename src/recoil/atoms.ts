import { atom } from 'recoil';

export const Height = atom<string>({
  key: 'Height',
  default: "80px",
})

export const Display = atom<boolean>({
  key: 'Display',
  default: false,
})

export const Change = atom<boolean>({
  key: 'Change',
  default: false,
})

export const AdultGuest = atom<number>({
  key: 'AdultGuest',
  default: 0,
})

export const ChildGuest = atom<number>({
  key: 'ChildGuest',
  default: 0,
})

export const InfantGuest = atom<number>({
  key: 'InfantGuest',
  default: 0,
})

export const FirstPickedDate = atom<string | null>({
  key: 'FirstPickedDate',
  default: '',
})

export const SecondPickedDate = atom<string | null>({
  key: 'SecondPickedDate',
  default: '',
})
