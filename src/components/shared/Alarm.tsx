import { useEffect, useRef } from 'react';
import { SetterOrUpdater } from 'recoil';
import styled, { keyframes } from 'styled-components';

interface AlarmProps {
  message: string;
  setAlarmState: SetterOrUpdater<boolean>;
}

export default function Alarm({ message, setAlarmState }: AlarmProps) {
  const alarmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const showAndHide = setTimeout(() => {
      setAlarmState(false);
    }, 2000);

    return () => clearTimeout(showAndHide);
  }, [setAlarmState]);

  useEffect(() => {
    if (alarmRef.current) {
      const width = alarmRef.current.offsetWidth;
      const leftValue = `calc(50% - ${width / 2}px)`;
      alarmRef.current.style.left = leftValue;
    }
  }, []);
  return (
    <StyleAlarmBox ref={alarmRef}>
      <StyleFlexBox>
        <span>{message}</span>
      </StyleFlexBox>
    </StyleAlarmBox>
  );
}

const showAndOut = keyframes`
    0% {
        transform: translateY(0%)
    }

    100% {
        transform: translateY(250%)
    }
`;

const StyleAlarmBox = styled.div`
  animation: ${showAndOut} 0.1s ease-in-out forwards;
  position: fixed;
  top: -10%;
  z-index: 99999;
  border-radius: 0.3rem;
  background-color: #009ca6;
  padding: 1rem 2rem;
`;

const StyleFlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
`;
