import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContentsTitleProps {
  children: ReactNode;
}

export default function ContentsTitle({ children }: ContentsTitleProps) {
  return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (min-width: 780px) {
    font-size: 30px;
  }
`;
