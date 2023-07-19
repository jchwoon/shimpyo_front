import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { ACCOMMODATION_PAGE } from '../../../constants/accommodation';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import {
  accommodationState,
  addressCheckState,
  disabledState,
  errorModalState,
  imageDataState,
  imageListState,
  roomImageListState,
  stepState,
} from '../../../recoil/accommodationAtoms';

interface StyledButtonProps {
  changePoint: boolean;
}

interface AccommodationRegistrationButtonProps {
  children: React.ReactNode;
}

export default function AccommodationRegistrationButton({ children }: AccommodationRegistrationButtonProps) {
  const changePoint = useMediaQuery('(min-width: 780px)');
  const navigate = useNavigate();
  const resetStepState = useResetRecoilState(stepState);
  const resetAccommodationState = useResetRecoilState(accommodationState);
  const resetDisabledState = useResetRecoilState(disabledState);
  const resetAddressCheckState = useResetRecoilState(addressCheckState);
  const resetErrorModalState = useResetRecoilState(errorModalState);
  const resetImageDataState = useResetRecoilState(imageDataState);
  const resetImageListState = useResetRecoilState(imageListState);
  const resetRoomImageListState = useResetRecoilState(roomImageListState);

  const moveAccommodationPage = () => {
    resetStepState();
    resetAccommodationState();
    resetDisabledState();
    resetAddressCheckState();
    resetErrorModalState();
    resetImageDataState();
    resetImageListState();
    resetRoomImageListState();
    navigate(ACCOMMODATION_PAGE);
  };

  return (
    <StyledButton changePoint={changePoint} onClick={moveAccommodationPage}>
      <AiOutlinePlus size={20} />
      {changePoint && <div>{children}</div>}
    </StyledButton>
  );
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: ${({ changePoint }) => (changePoint ? '10px' : '50%')};
  gap: 10px;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: scale(0.9);
    transition: transform 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;
