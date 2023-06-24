import { startTransition } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { buttonConstants } from '../../constants/buttonContent';
import buttonContent from '../../constants/buttonContent';
import { stepState } from '../../recoil/atoms';

interface buttonProps {
  step: keyof buttonConstants;
  isDisabled?: boolean;
}

export default function MoveButton({ step, isDisabled }: buttonProps) {
  const [stepNumber, setStepNumber] = useRecoilState(stepState);
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (step === 'START' || step === 'NEXT') {
      setStepNumber(stepNumber + 1);
    }

    if (step === 'PREV') {
      setStepNumber(stepNumber - 1);
    }

    if (step === 'FIN') {
      startTransition(() => {
        navigate('/hosting');
      });
    }
  };
  return (
    <StyledBtn disabled={isDisabled} step={step} onClick={handleOnClick}>
      {buttonContent[step]}
    </StyledBtn>
  );
}

const StyledBtn = styled.button<buttonProps>`
  font-size: 16px;
  border-radius: 0.625em;
  border: 0;
  background-color: black;
  color: white;
  height: 3em;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
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
          &:hover{
            background-color: rgba(0,0,0,0.1);
          }
        `;

      case 'FIN':
        return `
          width: 5.8em;
          background-color: #f02a2a;
          color: white;
          &:hover {
            cursor: pointer;
            background-color: rgba(253, 1, 1, 0.4);
          }
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
