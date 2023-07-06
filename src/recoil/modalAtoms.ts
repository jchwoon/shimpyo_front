import { atom } from 'recoil';

export const loginModalAtom = atom<boolean>({
  key: 'loginModalAtom',
  default: false,
});

export const joinModalAtom = atom<boolean>({
  key: 'joinModalAtom',
  default: false,
});

export const idFindModalAtom = atom<boolean>({
  key: 'idFindModalAtom',
  default: false,
});

export const additionalInfoModalAtom = atom<boolean>({
  key: 'additionalInfoModalAtom',
  default: false,
});

export const passwordFindModalAtom = atom<boolean>({
  key: 'passwordFindModalAtom',
  default: false,
});

export const reviewModalAtom = atom<boolean>({
  key: 'reviewModalAtom',
  default: false,
});

export const reviewManageModalAtom = atom<boolean>({
  key: 'reviewManageModalAtom',
  default: false,
});

export const guestManageModalAtom = atom<boolean>({
  key: 'guestManageModalAtom',
  default: false,
});

export const reservationCancelModalAtom = atom<boolean>({
  key: 'reservationCancelModalAtom',
  default: false,
});

export const reservationDetailModalAtom = atom<boolean>({
  key: 'reservationDetailModalAtom',
  default: false,
});
