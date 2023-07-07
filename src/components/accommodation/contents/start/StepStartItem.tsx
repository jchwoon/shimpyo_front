import styled from 'styled-components';

import { stepContent, stepContentImage } from '../../../../constants/stepContent';

export default function StepStartItem() {
  return (
    <StyledStepList>
      {Object.values(stepContent).map((stepItem, idx) => {
        return (
          <StyledStepElement key={idx}>
            <StyledStepTitle>{idx + 1}</StyledStepTitle>
            <StyledTextContainer>
              <StyledStepTitle>{stepItem[1]}</StyledStepTitle>
              <StyledStepContent>{stepItem[2]}</StyledStepContent>
            </StyledTextContainer>
            <StyledImage src={Object.values(stepContentImage)[idx]}></StyledImage>
          </StyledStepElement>
        );
      })}
    </StyledStepList>
  );
}

const StyledStepList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  @media (min-width: 780px) {
    width: 600px;
  }
`;

const StyledStepElement = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 3rem;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }

  @media (min-width: 780px) {
    padding: 1rem;
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-grow: 2;
  flex-direction: column;
  margin-right: 1rem;
  @media (min-width: 744px) {
  }
`;

const StyledStepTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0.5em;
  &:first-child {
    margin-right: 0.7em;
  }

  @media (min-width: 780px) {
    font-size: 21px;
  }
`;

const StyledStepContent = styled.p`
  font-size: 17px;
  line-height: 1.3em;
  color: rgba(0, 0, 0, 0.4);
  @media (min-width: 780px) {
    font-size: 20px;
    min-width: 10em;
  }
`;

const StyledImage = styled.img`
  width: 4rem;
  margin-left: 10px;
  @media (min-width: 780px) {
    width: 6rem;
    height: 6rem;
  }
`;
