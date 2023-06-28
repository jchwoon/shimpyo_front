import styled from 'styled-components';
import Header from '../layout/Header';
import Avatar from '../shared/Avatar';
import Logo from '../shared/Logo';

export default function ReservationHeader() {
  return (
    <Header>
      <FlexBox>
        <Logo width="70px" heihgt="30px" path="/" />
        <Avatar width="30px" height="30px" />
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
