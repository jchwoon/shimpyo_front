import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: IconType;
  iconColor?: string;
  containerColor?: string;
}

export default function SocialButton({ label, onClick, icon: Icon, containerColor, iconColor }: ButtonProps) {
  return (
    <StyleButton onClick={onClick} $containerColor={containerColor}>
      {Icon && <Icon style={{ color: iconColor, fontSize: '17px' }} />}
      <span style={{ color: iconColor }}>{label}</span>
    </StyleButton>
  );
}

const StyleButton = styled.div<{ $containerColor?: string }>`
  position: relative;
  cursor: pointer;
  background-color: ${props => props.$containerColor};
  border-radius: 8px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  width: auto;
  padding: 1rem 0;
  svg {
    position: absolute;
    left: 20px;
    top: 15px;
  }
`;
