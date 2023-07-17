import styled from 'styled-components';

interface CategoryTitleProps {
  title: string;
}

export default function CategoryTitle({ title }: CategoryTitleProps) {
  return (
    <StyleFlexBox>
      <div style={{ display: 'flex' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          <h2>{title}</h2>
        </div>
      </div>
    </StyleFlexBox>
  );
}

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  div {
    gap: 2rem;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;
