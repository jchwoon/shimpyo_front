import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isPassedState } from '../../../recoil/atoms';

interface StepLimitPassProps {
  children: React.ReactNode;
}

export default function StepFreePass({ children }: StepLimitPassProps) {
  const [isPassed, setIsPassed] = useRecoilState(isPassedState);

  useEffect(() => {
    if (!isPassed) {
      setIsPassed(true);
    }
  }, []);

  return <div>{children}</div>;
}
