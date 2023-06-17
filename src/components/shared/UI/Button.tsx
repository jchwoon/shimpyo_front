import styled from 'styled-components';
import { StyleButton } from '../../style/shareStyle';

interface ButtonProps {
  label: string;
  small?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ disabled = false, label, onClick, small = false }: ButtonProps) {
  return (
    <StyleOutlineButton disabled={disabled} onClick={onClick} $small={small}>
      {label}
    </StyleOutlineButton>
  );
}

const StyleOutlineButton = styled(StyleButton)`
  background: ${props => (props.disabled ? '#ccc' : '')};
  color: ${props => (props.disabled ? 'white' : '')};
  position: relative;
  border: 2px solid black;
  font-size: 14px;
  margin-bottom: 1rem;
  svg {
    position: absolute;
    left: 20px;
    top: 10px;
  }

  :hover {
    background-color: ${props => (props.disabled ? '' : 'rgb(230, 230, 230)')};
  }
`;
