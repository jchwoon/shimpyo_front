import { selector } from 'recoil';
import { accessTokenAtom, passwordValueAtom } from './userAtoms';
import { stepState } from './accommodationAtoms';
import { PAGE_NUMBERS } from '../constants/accommodation';

export const passwordSelector = selector({
  key: 'passwordSelector',
  get: ({ get }) => {
    const passwordValue = get(passwordValueAtom);

    return passwordValue;
  },
});

export const stepGaugeSelector = selector({
  key: 'stepGaugeSelector',
  get: ({ get }) => {
    const step = get(stepState);

    let accumulatedPages = 0;
    let currentPage = 0;

    for (let i = 0; i < PAGE_NUMBERS.length; i++) {
      accumulatedPages += PAGE_NUMBERS[i];
      if (step <= accumulatedPages) {
        currentPage = i + 1;
        break;
      }
    }

    const prevStep = accumulatedPages - PAGE_NUMBERS[currentPage - 1];

    const currentStep = step - prevStep;

    return [currentPage, currentStep, PAGE_NUMBERS[currentPage - 1]];
  },
});

export const isLoggedInSelector = selector({
  key: 'isLoggedInSelector',
  get: ({ get }) => !!get(accessTokenAtom),
});
