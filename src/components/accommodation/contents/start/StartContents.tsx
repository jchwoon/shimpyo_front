import styled from 'styled-components';
import StepStartItem from './StepStartItem';

export default function StartContents() {
  return (
    <Container>
      <StyledTitleDiv>
        <StyledMainTitle>간단하게 쉼표 숙소 등록을 시작할 수 있습니다.</StyledMainTitle>
      </StyledTitleDiv>
      <StepStartItem />
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;

  @media (min-width: 780px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledTitleDiv = styled.div`
  padding: 1rem 2rem 0.2rem 2rem;
  @media (min-width: 780px) {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 3rem;
    max-width: 510px;
  }
`;

const StyledMainTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 1em;
  line-height: 1.2em;
  font-weight: 500;

  @media (min-width: 780px) {
    font-size: 56px;

    margin: 0;
  }
`;
