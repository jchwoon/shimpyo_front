import styled from 'styled-components';

interface MenuProps {
  children: React.ReactNode;
}

export default function Menu({ children }: MenuProps) {
  return <StyleUserMenuBox>{children}</StyleUserMenuBox>;
}

const StyleUserMenuBox = styled.div`
  position: relative;
`;
