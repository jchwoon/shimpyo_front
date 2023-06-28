import styled from 'styled-components';
import Logo from '../shared/Logo';
import MotelManageMenu from './Menu/MotelManageMenu';
import UserMenu from './Menu/UserMenu';
import Header from '../layout/Header';

export default function HostingHeader() {
  return (
    <Header>
      <FlexBox>
        <Logo width="70px" heihgt="30px" path="/hosting" />
        <StyleHeaderMenuBox hidden>
          <MotelManageMenu />
        </StyleHeaderMenuBox>
        <UserMenu />
      </FlexBox>
    </Header>
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
