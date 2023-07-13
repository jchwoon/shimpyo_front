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
const defaultProfileImage = storedProfileImage ? JSON.parse(storedProfileImage) : '/images/basicProfile.jpg';

export const profileImageAtom = atom<string>({
  key: 'profileImageAtom',
  default: defaultProfileImage,
});

const storedNickname = localStorage.getItem('nickname');
const defaultNickname = storedNickname ? JSON.parse(storedNickname) : '';
export const nicknameAtom = atom<string>({
  key: 'nicknameAtom',
  default: defaultNickname,
});

const storedUserId = localStorage.getItem('userId');
const defaultUserId = storedUserId ? JSON.parse(storedUserId) : '';
export const userIdAtom = atom<number>({
  key: 'userIdAtom',
  default: defaultUserId,
});

export const loginStateAtom = atom<boolean>({
  key: 'loginStateAtom',
  default: false,
});
