import { keyframes } from 'styled-components';

export const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30%);
  }
  
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
