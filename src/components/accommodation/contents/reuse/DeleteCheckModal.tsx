import { MouseEvent } from 'react';
import { MdClose } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  label?: string;
  body?: string;
  onClose: () => void;
  handleOnButton: () => void;
}

export default function DeleteCheckModal({ label, onClose, handleOnButton, body }: ModalProps) {
  const closeModalHandler = () => {
    onClose();
  };
  return (
    <StyleModalOverlay onMouseDown={closeModalHandler}>
      <StyleModalBox onMouseDown={(e: MouseEvent) => e.stopPropagation()}>
        <StyleModalHead>
          <div>{label}</div>
          <StyledCloseIcon onClick={onClose} size={20} />
        </StyleModalHead>
        <ParentContainer>
          <StyledModalBody>{body}</StyledModalBody>
          <StyledButtonDiv>
            <StyledButton onClick={onClose}>아니오</StyledButton>
            <StyledButton onClick={handleOnButton}>예</StyledButton>
          </StyledButtonDiv>
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
  z-index: 9999;
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
  height: 100%;
  animation: ${moveUp} 0.75s;
  border-radius: 1rem;
  z-index: 5;

  @media only screen and (min-width: 640px) {
    background-color: white;
    height: auto;
    max-height: 600px;
    min-width: 500px;
    width: auto;
  }
`;

const StyleModalHead = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgb(200, 200, 200);
  font-weight: bold;
`;

const StyledModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const ParentContainer = styled.div`
  overflow-y: auto;
`;

const StyledButtonDiv = styled.div`
  padding: 1.5rem;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  font-size: 12px;
  width: 30%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  font-weight: 500;
  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    outline: 1px solid black;
  }
`;

const StyledCloseIcon = styled(MdClose)`
  position: absolute;
  right: 5px;
  padding: 10px;
  cursor: pointer;
`;
