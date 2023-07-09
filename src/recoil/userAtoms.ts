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

const storedProfileImage = localStorage.getItem('profileImage');
const defaultProfileImage = storedProfileImage !== null ? JSON.parse(storedProfileImage) : '';
export const profileImageAtom = atom<string>({
  key: 'profileImageAtom',
  default: defaultProfileImage,
});

const storedNickname = localStorage.getItem('nickname');
const defaultNickname = storedNickname !== null ? JSON.parse(storedNickname) : '';
export const nicknameAtom = atom<string>({
  key: 'nicknameAtom',
  default: defaultNickname,
});

export const loginStateAtom = atom<boolean>({
  key: 'loginStateAtom',
  default: false,
});
