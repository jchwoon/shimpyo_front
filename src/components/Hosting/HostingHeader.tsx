import styled from 'styled-components';
import MotelManageMenu from './Menu/MotelManageMenu';
import Header from '../layout/Header';
import Navbar from '../shared/Navbar/Navbar';
import UserMenuItem from '../shared/UserMenu/UserMenuItem';
import { useState } from 'react';

export default function HostingHeader() {
  const [loginState, setLoginState] = useState(true);
  const menuItems = (
    <div>
      {loginState ? (
        <div>
          <UserMenuItem bold label="프로필" onClick={() => console.log('hi')} />
          <UserMenuItem divide bold label="계정" onClick={() => console.log('hi')} />
          <UserMenuItem divide label="언어 및 번역" onClick={() => console.log('hi')} />
          <UserMenuItem label="게스트 모드로 전환" onClick={() => console.log('hi')} />
          <UserMenuItem label="로그아웃" onClick={() => console.log('hi')} />
        </div>
      ) : (
        <div>
          <UserMenuItem bold label="로그인" onClick={() => console.log('hi')} />
          <UserMenuItem divide label="로그아웃" onClick={() => console.log('hi')} />
          <UserMenuItem label="로그아웃" onClick={() => console.log('hi')} />
        </div>
      )}
    </div>
  );
  return (
    <Header>
      <FlexBox>
        <Navbar menuItems={menuItems} logoPath="/hosting">
          <StyleHeaderMenuBox hidden>
            <MotelManageMenu />
          </StyleHeaderMenuBox>
        </Navbar>
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
