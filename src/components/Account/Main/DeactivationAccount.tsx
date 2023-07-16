import styled from 'styled-components';
import DeactivationModal from '../Modal/DeactivationModal';
import { useSetRecoilState } from 'recoil';
import { accountDeActivationModalAtom } from '../../../recoil/modalAtoms';

export default function DeactivationAccount() {
  const setAccountDeactivationModal = useSetRecoilState(accountDeActivationModalAtom);
  return (
    <>
      <StyleDeactivationAccountBox>
        <StyleDeactivationButton onClick={() => setAccountDeactivationModal(true)}>
          <span>계정 비활성화 &rarr;</span>
        </StyleDeactivationButton>
      </StyleDeactivationAccountBox>
      <DeactivationModal />
    </>
  );
}

const StyleDeactivationAccountBox = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleDeactivationButton = styled.button`
  cursor: pointer;
  color: red;

  &:hover {
    color: #00adb5;
  }
`;
