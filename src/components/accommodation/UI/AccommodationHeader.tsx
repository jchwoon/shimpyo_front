import styled from 'styled-components';
import Header from '../../layout/Header';
import Logo from '../../shared/Logo';

export default function AccommodationHeader() {
  return (
    <StyledZindex>
      <Header>
        <Logo path="/" width="90px" height="40px" />
      </Header>
    </StyledZindex>
  );
}

const StyledZindex = styled.div`
  z-index: 0;
`;
