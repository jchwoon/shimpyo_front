import styled from 'styled-components';
import Header from '../layout/Header';
import Navbar from '../shared/Navbar/Navbar';
import UserMenuItem from '../shared/UserMenu/UserMenuItem';
import { useRecoilState } from 'recoil';
import { loginStateAtom } from '../../recoil/userAtoms';

export default function ReservationHeader() {
  const [loginState, setLoginState] = useRecoilState(loginStateAtom);
  const menuItems = (
    <div>
      <>
        <UserMenuItem bold onClick={() => {}} label="여행" />
        <UserMenuItem divide bold onClick={() => {}} label="위시리스트" />
        <UserMenuItem onClick={() => {}} label="숙소관리" />
        <UserMenuItem divide onClick={() => {}} label="계정" />
        <UserMenuItem onClick={() => {}} label="로그아웃" />
      </>
    </div>
  );
  return (
    <Header>
      <FlexBox>
        <Navbar menuItems={menuItems} logoPath="/" />
      </FlexBox>
    </Header>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
