import styled from 'styled-components';
import Header from '../../layout/Header';
import Navbar from '../../shared/Navbar/Navbar';
import UserMenuItem from '../../shared/UserMenu/UserMenuItem';

export default function CheckReservationDetailHeader() {
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
        <Navbar logoPath="/" menuItems={menuItems}>
          <div>hi</div>
        </Navbar>
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
