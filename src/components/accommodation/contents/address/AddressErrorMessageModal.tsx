import { MdError } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { addressCheckState, errorModalState, stepState } from '../../../../recoil/accommodationAtoms';

interface ErrorMessageModalProps {
  isOpen: boolean;
}

export default function ErrorMessageModal() {
  const [addressCheck, setAddressCheck] = useRecoilState(addressCheckState);
  const [stepNumber, setStepNumber] = useRecoilState(stepState);
  const [isOpen, setIsOpen] = useRecoilState(errorModalState);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOnPass = () => {
    setStepNumber(preState => preState + 1);
    setIsOpen(false);
    setAddressCheck(true);
  };

  return (
    <StyledFlexDiv isOpen={isOpen}>
      <div>
        <StyledErrorIcon size="50px"></StyledErrorIcon>
      </div>
      <StyledContentDiv>
        <StyledTextDiv>주소를 인식하지 못했습니다.</StyledTextDiv>
        <StyledSubTextDiv>주소가 올바른가요?</StyledSubTextDiv>
        <StyledButtonDiv>
          <StyledButton onClick={handleCloseModal}>아니요, 주소를 수정합니다.</StyledButton>
          <StyledButton onClick={handleOnPass}>예, 주소가 정확합니다.</StyledButton>
        </StyledButtonDiv>
      </StyledContentDiv>
      <div>
        <StyledCloseIcon size={25} onClick={handleCloseModal} />
      </div>
    </StyledFlexDiv>
  );
}

const StyledFlexDiv = styled.div<ErrorMessageModalProps>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: absolute;
  display: flex;
  background-color: white;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 120px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 9999;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: translateY(${({ isOpen }) => (isOpen ? '80%' : '100%')});
  transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s ease;

  ${({ isOpen }) => (!isOpen ? 'overflow: hidden;' : '')}

  bottom: 140%;

  @media (min-width: 780px) {
    width: 45%;
    left: 30%;
  }
`;

const StyledErrorIcon = styled(MdError)`
  color: #df1a1a;
`;

const StyledContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const StyledTextDiv = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

const StyledSubTextDiv = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
`;

const StyledCloseIcon = styled(AiOutlineClose)`
  padding: 5px;
  border-radius: 50%;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledButtonDiv = styled.div`
  display: flex;
  padding: 10px;
`;

const StyledButton = styled.button`
  font-size: 12px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: white;
  font-weight: 500;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid black;
  }
  border-radius: 10px;
`;
