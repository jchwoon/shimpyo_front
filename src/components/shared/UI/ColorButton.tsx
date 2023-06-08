import styled from 'styled-components';

interface ColorButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export default function ColorButton({ label, disabled, onClick }: ColorButtonProps) {
  return (
    <StyleButton onClick={onClick} disabled={disabled}>
      {label}
    </StyleButton>
  );
}

const StyleButton = styled.button<{ disabled: boolean }>`
  background: ${props => (props.disabled ? '#ccc' : 'linear-gradient(90deg, #00adb5, #009ca6);')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: #fff;
  font-weight: bold;
  border-radius: 0.5rem;
  border: none;
  text-align: center;
  width: auto;

  margin: 1rem 0;
  padding: 1rem 0;
  a {
    display: block;
    width: 100%;
  }
`;
