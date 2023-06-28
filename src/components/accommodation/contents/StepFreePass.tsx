import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isPassedState } from '../../../recoil/atoms';

interface StepFreePassProps {
  children: React.ReactNode;
}

export default function StepFreePass({ children }: StepFreePassProps) {
  const [isPassed, setIsPassed] = useRecoilState(isPassedState);

  useEffect(() => {
    if (!isPassed) {
      setIsPassed(false);
    }
  }, []);

  return <div>{children}</div>;
}
