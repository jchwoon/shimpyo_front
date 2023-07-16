import styled from 'styled-components';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import DeleteCheckModal from '../../accommodation/contents/reuse/DeleteCheckModal';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useNavigate } from 'react-router-dom';

interface StyledButtonProps {
  changePoint: boolean;
}

interface AccommodationDeleteButtonProps {
  houseId: string | undefined;
}

export default function AccommodationDeleteButton({ houseId }: AccommodationDeleteButtonProps) {
  const changePoint = useMediaQuery('(min-width: 780px)');
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { sendRequest, responseData } = useAuthorizedRequest<any>({});

  const openCloseDeleteCheckModal = () => {
    setOpenModal(preState => !preState);
  };

  const deleteAccommodation = async () => {
    try {
      await sendRequest({ url: `/user/houses/${houseId}`, method: 'DELETE' });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!responseData) return;
    if (responseData.isSuccess) {
      alert('숙소 삭제가 완료되었습니다.');
      navigate('/hosting');
    } else {
      alert('숙소 삭제가 완료되지않았습니다.');
    }
  }, [responseData]);

  return (
    <>
      <StyledButton changePoint={changePoint} onClick={openCloseDeleteCheckModal}>
        <RiDeleteBinLine size={20} />
        {changePoint && <>숙소 삭제하기</>}
      </StyledButton>
      {openModal && (
        <DeleteCheckModal
          label="숙소를 삭제하시겠습니까?"
          handleOnButton={deleteAccommodation}
          onClose={openCloseDeleteCheckModal}
        />
      )}
    </>
  );
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ changePoint }) => (changePoint ? '130px' : '50px')};
  height: 50px;
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
