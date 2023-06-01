import styled from 'styled-components';
import MotelManageMenu from '../components/Menu/MotelManageMenu';
import Header from '../components/layout/Header';
import Logo from '../components/Logo';
import UserMenu from '../components/Menu/UserMenu';

export default function Hosting() {
  return (
    <>
      <Header>
        <FlexBox>
          <Logo />
          <StyleHeaderMenuBox hidden>
            <MotelManageMenu />
          </StyleHeaderMenuBox>
          <UserMenu />
        </FlexBox>
      </Header>
    </>
  );
}

const StyleHeaderMenuBox = styled.div`
  position: relative;
  @media only screen and (min-width: 1024px) {
    display: block;
  }
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// const StyleMain = styled.main`
//   @media only screen and (min-wi)
// `;
