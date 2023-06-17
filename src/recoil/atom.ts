import { atom } from 'recoil';

export const joinModalAtom = atom<boolean>({
  key: 'joinModalAtom',
  default: true,
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
