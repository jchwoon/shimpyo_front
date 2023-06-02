import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContentsTitleProps {
  children: ReactNode;
}

export default function ContentsTitle({ children }: ContentsTitleProps) {
  return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
`;
