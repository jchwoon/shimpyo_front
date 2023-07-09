import { useState } from 'react';
import styled from 'styled-components';

interface BlackButtonProps {
  label: string;
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  disabled: boolean;
}

export default function BlackButton({ label, buttonType, onClick, disabled }: BlackButtonProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <StyleSubmitButton
      disabled={disabled}
      onClick={onClick}
      isPressed={isPressed}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      type={buttonType}
    >
      {label}
    </StyleSubmitButton>
  );
}

const StyleSubmitButton = styled.button<{ isPressed: boolean }>`
  background-color: black;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 14px 24px;
  cursor: pointer;
  border-radius: 0.5rem;

  scale: ${({ isPressed }) => isPressed && 0.9};
`;
