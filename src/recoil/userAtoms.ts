import { atom } from 'recoil';

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

export const loginStateAtom = atom<boolean>({
  key: 'loginStateAtom',
  default: false,
});
