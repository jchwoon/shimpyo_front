import styled from 'styled-components';
import { stepContent, stepConstants } from '../../../constants/stepContent';

interface StepContentProps {
  step: keyof stepConstants;
}

export default function StepStartContents({ step }: StepContentProps) {
  return (
    <StyledStepElement>
      <StyledTextContainer>
        <StyledStep>{stepContent[step][0]}</StyledStep>
        <StyledStepTitle>{stepContent[step][1]}</StyledStepTitle>
        <StyledStepContent>{stepContent[step][2]}</StyledStepContent>
      </StyledTextContainer>
      <StyledImage src="/hotel5.jpg" alt="이미지" />
    </StyledStepElement>
  );
}

const StyledStepElement = styled.li`
  display: flex;
  width: 1229px;
  height: 324px;
  justify-content: space-between;
`;

const StyledTextContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledStep = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 15px;
`;

const StyledStepTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 45px;
`;

const StyledStepContent = styled.p`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 25px;
`;

const StyledImage = styled.img`
  width: 600px;
`;
