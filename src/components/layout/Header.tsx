import styled from 'styled-components';
import Container from '../shared/Container';

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <StyleHeaderBox>
      <div className="space">
        <Container>{children}</Container>
      </div>
    </StyleHeaderBox>
  );
}

const StyleHeaderBox = styled.div`
  position: sticky;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.1);
  background-color: white;
  z-index: 100;
  top: 0;
  width: 100%;
  .space {
    padding: 1rem;
    border-bottom-width: 1px;
  }
`;
