import { atom } from 'recoil';

export const loginModalAtom = atom<boolean>({
  key: 'LoginState',
  default: false,
});

export const joinModalAtom = atom<boolean>({
  key: 'JoinState',
  default: true,
});

export const passwordValueAtom = atom<string>({
  key: 'PasswordValueState',
  default: '',
});

export const confirmPasswordValueAtom = atom<string>({
  key: 'confirmPasswordValueAtom',
  default: '',
});

export const additionalInfoModalAtom = atom<boolean>({
  key: 'additionalInfoModalAtom',
  default: false,
});

export const nicknameValueAtom = atom<string>({
  key: 'nicknameValueAtom',
  default: '',
});

export const emailValueAtom = atom<string>({
  key: 'emailValueAtom',
  default: '',
});
