import styled from 'styled-components';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <StyleSection>
      <StyleFlexBox>
        <StyleTitle>{title}</StyleTitle>
        {children}
      </StyleFlexBox>
    </StyleSection>
  );
}

const StyleSection = styled.section`
  margin-top: 0.5rem;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  background-color: white;
`;

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleTitle = styled.h2`
  font-weight: bold;
  font-size: 22px;
`;
