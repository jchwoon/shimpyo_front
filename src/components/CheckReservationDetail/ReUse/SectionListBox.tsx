import { IconType } from 'react-icons/lib';
import styled, { css } from 'styled-components';

interface SectionListBoxProps {
  title: string;
  content?: string | number | React.ReactElement;
  detail?: boolean;
  icon?: IconType;
  button?: boolean;
  onClick?: () => void;
}

export default function SectionListBox({
  title,
  content,
  detail,
  icon: Icon,
  button = false,
  onClick,
}: SectionListBoxProps) {
  return (
    <StyleListBox onClick={onClick} button={button}>
      <div style={{ display: 'flex' }}>
        {Icon && <Icon style={{ marginRight: '1rem' }} size={35} />}
        <div>
          <StyleTitle style={{ marginBottom: '1rem' }}>
            <span>{title}</span>
          </StyleTitle>
          <StyleContent>
            <span>{content}</span>
          </StyleContent>
        </div>
      </div>
      {detail && (
        <StyleToDetailButton>
          <span>{detail}</span>
        </StyleToDetailButton>
      )}
    </StyleListBox>
  );
}

const StyleListBox = styled.div<{ button: boolean }>`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;

  ${props =>
    props.button &&
    css`
      &:hover {
        background-color: rgba(230, 230, 230, 0.3);
        cursor: pointer;
      }
    `}
`;

const StyleTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const StyleContent = styled.div``;

const StyleToDetailButton = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 10px;
`;
