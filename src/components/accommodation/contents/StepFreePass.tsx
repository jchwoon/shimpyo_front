import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isPassedState } from '../../../recoil/atoms';

interface StepFressPassProps {
  children: React.ReactNode;
}

export default function StepFreePass({ children }: StepFressPassProps) {
  const [isPassed, setIsPassed] = useRecoilState(isPassedState);

  useEffect(() => {
    setIsPassed(false);
  }, []);

  return <div>{children}</div>;
}
