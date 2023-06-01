import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface StepProps {
  stepOne?: number;
  stepTwo?: number;
  stepThree?: number;
  progress: number;
}

export default function StepBar() {
  const test = [3, 2, 5];

  const [stepOne, setStepOne] = useState<number>(0);
  const [stepTwo, setStepTwo] = useState<number>(0);
  const [stepThree, setStepThree] = useState<number>(0);

  const progress = Math.floor((test[1] / test[2]) * 100);

  useEffect(() => {
    if (test[0] === 1) {
      setStepOne(progress);
      setStepTwo(0);
      setStepThree(0);
    } else if (test[0] === 2) {
      setStepOne(100);
      setStepTwo(progress);
      setStepThree(0);
    } else if (test[0] === 3) {
      setStepOne(100);
      setStepTwo(100);
      setStepThree(progress);
    }
  }, [test]);

  return (
    <Container>
      <Step>
        <Progress stepOne={stepOne} progress={progress}></Progress>
      </Step>
      <Step>
        <Progress stepTwo={stepTwo} progress={progress}></Progress>
      </Step>
      <Step>
        <Progress stepThree={stepThree} progress={progress}></Progress>
      </Step>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Step = styled.div`
  width: 32%;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
`;

const Progress = styled.div<StepProps>`
  width: 100%;
  position: relative;
  left: -100%;
  height: 10px;
  background-color: black;
  transition: transform 600ms linear 0s;

  ${props => {
    if (props.stepOne) {
      return `
      transform: translateX(${props.stepOne}%);
      `;
    } else if (props.stepTwo) {
      return `
      transform: translateX(${props.stepTwo}%);
      transition: transform 600ms linear 0.6s;
      `;
    } else if (props.stepThree) {
      return `
      transform: translateX(${props.stepThree}%);
      transition: transform 600ms linear 1.2s;
      `;
    }
  }}
`;
