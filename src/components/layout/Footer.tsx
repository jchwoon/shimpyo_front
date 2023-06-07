import styled from 'styled-components';
import Container from '../shared/Container';

interface FooterProps {
  children: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return (
    <StyleFooterBox>
      <Container>{children}</Container>
    </StyleFooterBox>
  );
}

const StyleFooterBox = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 -1px 2px 0 rgb(0 0 0 / 0.1);
`;
