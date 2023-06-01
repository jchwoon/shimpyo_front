import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <StyleButton>
      <Link to={''}>{label}</Link>
    </StyleButton>
  );
}

const StyleButton = styled.div`
  border-radius: 0.5rem;
  border: 1px solid black;
  text-align: center;
  width: auto;
  margin-bottom: 1rem;
  pointer-events: auto;
  padding: 0.5rem 0;
  a {
    display: block;
    width: 100%;
  }
`;
