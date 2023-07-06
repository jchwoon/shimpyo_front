import { useState } from 'react';
import styled from 'styled-components';

export interface AccountInfoListProps {
  title: string;
  infoContent: string;
  editComponent: React.ReactNode;
}

export default function AccountInfoList({ title, infoContent, editComponent }: AccountInfoListProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <StyleListBox>
      <StyleListContents>
        <StyleFlexBox>
          <StyleInfo>
            <span>{title}</span>
            <span style={{ color: '#717171' }}>{infoContent}</span>
          </StyleInfo>
          <div>
            <StyleModifyButton onClick={() => setIsEditMode(prev => !prev)}>{`${
              isEditMode ? '취소' : '수정'
            }`}</StyleModifyButton>
          </div>
        </StyleFlexBox>
      </StyleListContents>
      {isEditMode && editComponent}
    </StyleListBox>
  );
}

const StyleListBox = styled.div`
  border-bottom: 1px solid rgb(235, 235, 235);
`;

const StyleListContents = styled.div`
  padding: 2rem 0;
`;

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyleModifyButton = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
  text-decoration: underline;
`;
