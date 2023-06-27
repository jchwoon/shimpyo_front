import { selector } from 'recoil';
import { passwordValueAtom } from './User/userAtoms';

export const passwordSelector = selector({
  key: 'passwordSelector',
  get: ({ get }) => {
    const passwordValue = get(passwordValueAtom);

    return passwordValue;
  },
});
