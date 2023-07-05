import styled from 'styled-components';
import { stepContent, stepConstants, stepContentVideo } from '../../../../constants/stepContent';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accommodationState, disabledState } from '../../../../recoil/accommodationAtoms';

interface StepContentProps {
  step: keyof stepConstants;
}

export default function StepStartContents({ step }: StepContentProps) {
  const [disabled, setDisabled] = useRecoilState(disabledState);
  useEffect(() => {
    setDisabled(false);
  }, []);

  return (
    <StyledStepElement>
      <StyledTextContainer>
        <StyledStep>{stepContent[step][0]}</StyledStep>
        <StyledStepTitle>{stepContent[step][1]}</StyledStepTitle>
        <StyledStepContent>{stepContent[step][2]}</StyledStepContent>
      </StyledTextContainer>
      <StyledVideo autoPlay>
        <source src={stepContentVideo[step]} type="video/mp4"></source>
      </StyledVideo>
    </StyledStepElement>
  );
}

const StyledStepElement = styled.li`
  display: flex;
  flex-direction: column-reverse;
  padding: 1rem 1rem 4rem 1rem;

  @media (min-width: 780px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledTextContainer = styled.div`
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
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 45px;
  @media (min-width: 780px) {
    font-size: 36px;
  }
`;

const StyledStepContent = styled.p`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 25px;
`;

const StyledVideo = styled.video`
  width: 100%;
  @media (min-width: 780px) {
    width: 400px;
  }
`;
