import styled from 'styled-components';
import { RiErrorWarningLine } from 'react-icons/ri';

interface InfoItemProps {
  title: string;
  warningMessage?: string;
  contentMessage?: string;
  linkMessage: string;
}

export default function InfoItem({ title, warningMessage, contentMessage, linkMessage }: InfoItemProps) {
  return (
    <StyleInFoItemBox>
      <StyleFlex>
        <StyleContent>
          <StyleInfoTitle>{title}</StyleInfoTitle>
          <StyleWarningMessage>{warningMessage}</StyleWarningMessage>
          {contentMessage && <div>{contentMessage}</div>}
          <StyleLinkMessage>
            <span>{linkMessage}</span>
          </StyleLinkMessage>
        </StyleContent>
        <div>
          <RiErrorWarningLine color={`rgb(193,53,21)`} size={25} />
        </div>
      </StyleFlex>
    </StyleInFoItemBox>
  );
}

const StyleInFoItemBox = styled.div`
  padding: 0.75rem;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 1rem;
`;

const StyleFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
  width: 100%;
`;

const StyleInfoTitle = styled.h3`
  font-weight: bold;
`;

const StyleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 80%;
  height: 100%;
  font-size: 14px;
`;

const StyleWarningMessage = styled.div`
  font-weight: bold;
  color: rgb(193, 53, 21);
`;

const StyleLinkMessage = styled.div`
  font-weight: bold;
  margin-top: 0.5rem;
  text-decoration: underline;
`;
