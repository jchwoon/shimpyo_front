import styled from 'styled-components';
import Container from '../Container';

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <HeaderBox>
      <div className="space">
        <Container>{children}</Container>
      </div>
    </HeaderBox>
  );
}

const HeaderBox = styled.div`
  position: fixed;
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
