import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContentsSubTextProps {
  children: ReactNode;
}

export default function ContentsSubText({ children }: ContentsSubTextProps) {
  return <StyledStepContent>{children}</StyledStepContent>;
}

const StyledStepContent = styled.p`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
  text-align: left;

  margin-top: 15px;
`;
