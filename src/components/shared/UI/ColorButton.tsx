import styled from 'styled-components';
import { StyleButton } from '../../style/shareStyle';

interface ColorButtonProps {
  small?: boolean;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function ColorButton({ label, disabled = false, onClick, small = false }: ColorButtonProps) {
  return (
    <StyleColorButton $small={small} onClick={onClick} disabled={disabled}>
      {label}
    </StyleColorButton>
  );
}

const StyleColorButton = styled(StyleButton)`
  background: ${props => (props.disabled ? '#ccc' : 'linear-gradient(90deg, #00adb5, #009ca6);')};
  color: #fff;
  border: none;
  margin: 1rem 0;
  a {
    display: block;
    width: 100%;
  }
`;
