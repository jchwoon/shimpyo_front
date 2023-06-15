import styled from 'styled-components';

export default function Welcome() {
  return (
    <StyleWelcomeBox>
      <StyleWelcomeTitle>{`?? 님,반갑습니다!`}</StyleWelcomeTitle>
    </StyleWelcomeBox>
  );
}

const StyleWelcomeBox = styled.div`
  padding-top: 5rem;
`;

const StyleWelcomeTitle = styled.h1`
  font-weight: bold;
  font-size: xx-large;
  letter-spacing: 0.1rem;
`;
