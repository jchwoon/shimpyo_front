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