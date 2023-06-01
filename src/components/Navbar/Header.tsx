import styled from 'styled-components';
import Container from '../Container';
import { ReactElement } from 'react';
import Logo from '../Logo';
import UserMenu from '../Menu/UserMenu';

interface HeaderProps {
  centerContent: ReactElement;
}

export default function Header({ centerContent }: HeaderProps) {
  return (
    <HeaderBox>
      <div className="space">
        <Container>
          <FlexBox>
            <Logo />
            {centerContent}
            <UserMenu />
          </FlexBox>
        </Container>
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

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
