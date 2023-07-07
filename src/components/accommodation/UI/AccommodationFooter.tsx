import styled from 'styled-components';
import StepBar from './StepBar';
import MoveButton from './MoveButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { disabledState, stepState } from '../../../recoil/accommodationAtoms';
import { ALL_STEP_NUMBER } from '../../../constants/accommodation';
import ErrorMessageModal from '../contents/address/AddressErrorMessageModal';

export default function AccommodationFooter() {
  const stepNumber = useRecoilValue(stepState);
  const [disabled, setDisabled] = useRecoilState(disabledState);

  return (
    <StyledFooter>
      <StepBar />
      {stepNumber === 0 && (
        <StyledFlexButtonContainer>
          <div></div>
          <MoveButton step="START" />
        </StyledFlexButtonContainer>
      )}
      {stepNumber !== 0 && stepNumber !== ALL_STEP_NUMBER && (
        <StyledFlexButtonContainer>
          <MoveButton step="PREV" />
          <MoveButton step="NEXT" isDisabled={disabled} />
        </StyledFlexButtonContainer>
      )}
      {stepNumber === ALL_STEP_NUMBER && (
        <StyledFlexButtonContainer>
          <MoveButton step="PREV" />
          <MoveButton step="FIN" />
        </StyledFlexButtonContainer>
      )}
      <ErrorMessageModal />
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  min-width: 360px;
  position: relative;
`;

const StyledFlexButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
`;
