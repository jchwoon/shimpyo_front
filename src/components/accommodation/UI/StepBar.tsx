import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { stepGaugeSelector } from '../../../recoil/selector';

interface StepProps {
  stepOne?: number;
  stepTwo?: number;
  stepThree?: number;
  progress: number;
}

export default function StepBar() {
  const gauge = useRecoilValue(stepGaugeSelector) as number[];

  const [stepOne, setStepOne] = useState<number>(0);
  const [stepTwo, setStepTwo] = useState<number>(0);
  const [stepThree, setStepThree] = useState<number>(0);
  const [stepFour, setStepFour] = useState<number>(0);

  const progress = Math.floor((gauge[1] / gauge[2]) * 100);

  useEffect(() => {
    if (gauge[0] === 1) {
      setStepOne(progress);
      setStepTwo(0);
      setStepThree(0);
      setStepFour(0);
    } else if (gauge[0] === 2) {
      setStepOne(100);
      setStepTwo(progress);
      setStepThree(0);
      setStepFour(0);
    } else if (gauge[0] === 3) {
      setStepOne(100);
      setStepTwo(100);
      setStepThree(progress);
      setStepFour(0);
    } else if (gauge[0] === 4) {
      setStepOne(100);
      setStepTwo(100);
      setStepThree(100);
      setStepFour(progress);
    }
  }, [progress, gauge]);

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
      <Step>
        <Progress stepThree={stepFour} progress={progress}></Progress>
      </Step>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Step = styled.div`
  width: 24%;
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
      transition: transform 600ms linear 0.1s;
      `;
    } else if (props.stepThree) {
      return `
      transform: translateX(${props.stepThree}%);
      transition: transform 600ms linear 0.1s;
      `;
    }
  }}
`;
