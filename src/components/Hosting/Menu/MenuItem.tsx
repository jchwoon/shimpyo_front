import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

interface MenuItemProps {
  label: string;
  bold?: boolean;
  icon?: IconType;
  onClick?: () => void;
}

export default function MenuItem({ label, bold, icon: Icon, onClick }: MenuItemProps) {
  return (
    <StyleItem onClick={onClick} $bold={bold}>
      {Icon && <Icon size={25} />}
      <div>{label}</div>
    </StyleItem>
  );
}

const StyleItem = styled.div<{ $bold?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-size: medium;
  padding: 0.75rem 1rem;
  :hover {
    cursor: pointer;
    background-color: rgb(245, 245, 245);
  }
  font-weight: ${props => (props.$bold ? 'bold' : 'normal')};
`;
