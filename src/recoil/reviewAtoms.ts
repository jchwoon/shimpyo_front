import { atom } from 'recoil';

export const reviewContentAtom = atom<string>({
  key: 'reviewContentAtom',
  default: '',
});

type AverageScore = 'GOOD' | 'NORMAL' | 'BAD';
export const reviewAverageScoreAtom = atom<AverageScore>({
  key: 'reviewAverageScoreAtom',
  default: 'GOOD',
});

export const reviewIdAtom = atom<number>({
  key: 'reviewIdAtom',
  default: 0,
});
