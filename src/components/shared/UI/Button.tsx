import styled from 'styled-components';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return <StyleButton>{label}</StyleButton>;
}

const StyleButton = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid black;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  width: auto;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  svg {
    position: absolute;
    left: 20px;
    top: 10px;
  }

  :hover {
    background-color: rgb(230, 230, 230);
  }
`;
