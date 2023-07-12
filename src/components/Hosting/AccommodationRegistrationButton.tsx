import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface StyledButtonProps {
  changePoint: boolean;
}

interface AccommodationRegistrationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function AccommodationRegistrationButton({ children, onClick }: AccommodationRegistrationButtonProps) {
  const changePoint = useMediaQuery('(min-width: 780px)');

  return (
    <StyledButton changePoint={changePoint} onClick={onClick}>
      <AiOutlinePlus size={20} />
      {changePoint && <div>{children}</div>}
    </StyledButton>
  );
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: ${({ changePoint }) => (changePoint ? '10px' : '50%')};
  gap: 10px;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: scale(0.9);
    transition: transform 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;
