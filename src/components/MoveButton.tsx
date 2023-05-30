import styled from 'styled-components';
import { buttonConstants } from '../constants/buttonContent';
import buttonContent from '../constants/buttonContent';

interface buttonProps {
  step: keyof buttonConstants;
  isDisabled?: boolean;
}

export default function MoveButton({step,isDisabled}: buttonProps) {
  return <StyledBtn disabled={isDisabled} step={step}>{buttonContent[step]}</StyledBtn>;
}

const StyledBtn =
  styled.button <
  buttonProps >
  `
  font-size: 16px;
  border-radius: 0.625em;
  border: 0;
  background-color: black;
  color: white;
  height: 3em;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,0.4);
  }
  
  &:disabled {
    background-color: rgba(0,0,0,0.2);
    cursor: not-allowed;
  }

  ${props => {
    switch (props.step) {
      case 'START':
        return `
          width: 8em;
        `;
      case 'NEXT':
        return `
          width: 5.8em;
        `;

      case 'PREV':
        return `
          width: 5.8em;
          background-color: white;
          color: black;
          text-decoration: underline;
        `;

      default:
        return `
          width: 5.8em;
          `;
    }
  }}
  @media (max-width: 360px) {
    font-size: 10px;
  }
`;
