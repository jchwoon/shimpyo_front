import { ReactElement } from 'react';
import { MdClose } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  body: ReactElement;
  footer?: ReactElement;
  label?: string;
  title?: string | ReactElement;
}

export default function Modal({ isOpen, label, title, body, footer }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <StyleModalOverlay>
      <StyleModalBox>
        <StyleModalHead>
          <MdClose style={{ position: 'absolute', left: 20 }} size={20} />
          <div>{label}</div>
        </StyleModalHead>
        <ParentContainer>
          <StyleModalBody>
            <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{title}</div>
            <div>{body}</div>
            {footer}
          </StyleModalBody>
        </ParentContainer>
      </StyleModalBox>
    </StyleModalOverlay>
  );
}

const moveUp = keyframes`
  from {
    transform: translateY(150%)
  }
  to {
    transform: translateY(0%)
  }
`;

const StyleModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 30%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleModalBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  animation: ${moveUp} 0.75s;
  height: 100%;
  border-radius: 1rem;
  z-index: 5;

  @media only screen and (min-width: 640px) {
    background-color: white;
    height: 600px;
    width: 500px;
  }
`;

const StyleModalHead = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgb(200, 200, 200);
  font-weight: bold;
`;

const StyleModalBody = styled.div`
  padding: 1.5rem;
`;

const ParentContainer = styled.div`
  overflow-y: auto;
`;
