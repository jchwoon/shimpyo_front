import styled from 'styled-components';

interface MenuBlockProps {
  label: string;
  children: React.ReactNode;
}

export default function MenuBlock({ label, children }: MenuBlockProps) {
  return (
    <StyleBlock>
      <StyleTitle>{label}</StyleTitle>
      {children}
      <div className="line"></div>
    </StyleBlock>
  );
}

const StyleBlock = styled.div`
  .line {
    margin: 50px 0;
    height: 1px;
    background-color: gray;
  }
`;

const StyleTitle = styled.div`
  color: gray;
  font-size: small;
  margin-bottom: 20px;
`;
