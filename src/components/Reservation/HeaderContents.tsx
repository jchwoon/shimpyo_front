import styled from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

interface HeaderContentsProps {
  title: string;
  onClick: () => void;
  isOpen: boolean;
}

export default function HeaderContents({ title, onClick, isOpen }: HeaderContentsProps) {
  return (
    <StyleFlexBox>
      <div onClick={onClick} style={{ display: 'flex', cursor: 'pointer' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          <h2>{title}</h2>
        </div>
        <div>{isOpen ? <AiFillCaretUp size={25} /> : <AiFillCaretDown size={25} />}</div>
      </div>
    </StyleFlexBox>
  );
}

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  div {
    gap: 2rem;
    padding: 0.5rem;
    border-radius: 5px;
    &:hover {
      background-color: rgb(240, 240, 240);
    }
  }
`;
