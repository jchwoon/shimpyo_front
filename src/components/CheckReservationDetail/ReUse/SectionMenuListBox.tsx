import { IconType } from 'react-icons/lib';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

interface SectionMenuListBoxProps {
  icon: IconType;
  content: string;
  onClick?: () => void;
  disable?: boolean;
}

export default function SectionMenuListBox({ icon: Icon, content, onClick, disable = false }: SectionMenuListBoxProps) {
  return (
    <StyleListBox disable={disable} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ marginRight: '1rem' }} size={20} />
          <StyleContent>
            <span>{content}</span>
          </StyleContent>
        </div>
        <div>
          <IoIosArrowForward size={20} />
        </div>
      </div>
    </StyleListBox>
  );
}

const StyleListBox = styled.div<{ disable: boolean }>`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  text-decoration: ${({ disable }) => (disable ? 'line-through' : '')};

  &:hover {
    background-color: ${({ disable }) => (disable ? '' : 'rgba(230, 230, 230, 0.3)')};
    cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
  }
`;

const StyleContent = styled.div``;
