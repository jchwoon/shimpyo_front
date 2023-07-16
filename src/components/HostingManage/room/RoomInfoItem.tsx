import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AiOutlineClose } from 'react-icons/ai';
import { GrPrevious, GrNext } from 'react-icons/gr';

import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentRoomDataIndexState,
  formDataState,
  originalRoomDataState,
  patchRoomReqState,
  roomDataState,
} from '../../../recoil/hostingManageAtoms';

interface RoomInfoItemProps {
  Ref: React.RefObject<HTMLDivElement>;
  label: string;
  children: ReactNode;
  editContents: ReactNode;
  houseId: string | undefined;
}

export default function RoomInfoItem({ Ref, label, children, editContents, houseId }: RoomInfoItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { sendRequest, responseData } = useAuthorizedRequest<any>({});
  const { sendRequest: editedSendRequest, responseData: editedResponseData } = useAuthorizedRequest<any>({});

  const [originalRoomData, setOriginalRoomData] = useRecoilState(originalRoomDataState);

  const [roomData, setRoomData] = useRecoilState(roomDataState);
  const formData = useRecoilValue(formDataState);
  const [currentRoomDataIndex, setCurrentRoomDataIndex] = useRecoilState(currentRoomDataIndexState);
  const [patchRoomData, setPatchRoomData] = useRecoilState(patchRoomReqState);

  const openCloseEditComponent = () => {
    setRoomData(originalRoomData);
    setCurrentRoomDataIndex(0);
    setIsOpen(preState => !preState);
  };

  const prevMove = () => {
    if (currentRoomDataIndex === 0) return;
    setCurrentRoomDataIndex(preState => preState - 1);
  };

  const nextMove = () => {
    if (currentRoomDataIndex === roomData.length - 1) return;
    setCurrentRoomDataIndex(preState => preState + 1);
  };

  const dataPatch = async () => {
    const newFormData = new FormData();
    formData.forEach((value, key) => {
      newFormData.append(key, value);
    });

    const { name, price, minPeople, maxPeople, bedCount, bedroomCount, bathroomCount, totalCount, checkIn, checkOut } =
      roomData[currentRoomDataIndex];

    const newPatchRoomReq = {
      ...patchRoomData,
      name,
      price,
      minPeople,
      maxPeople,
      bedCount,
      bedroomCount,
      bathroomCount,
      totalCount,
      checkIn,
      checkOut,
    };

    newFormData.delete('patchRoomReq');
    newFormData.append('patchRoomReq', new Blob([JSON.stringify(newPatchRoomReq)], { type: 'application/json' }));

    try {
      await sendRequest({
        url: `/user/rooms/${roomData[currentRoomDataIndex].roomId}`,
        method: 'PATCH',
        body: newFormData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!responseData) return;

    const fetchData = async () => {
      try {
        await editedSendRequest({ url: `/api/houses/${houseId}` });
      } catch (err) {
        console.log(err);
      }
    };

    if (responseData.isSuccess) {
      fetchData();
      alert('객실 수정이 완료되었습니다.');

      setIsOpen(preState => !preState);
    } else {
      alert('객실 수정을 하지못했습니다.');
    }
  }, [responseData]);

  useEffect(() => {
    if (!editedResponseData) return;
    if (editedResponseData.isSuccess) {
      setRoomData(editedResponseData.result.rooms);
      setOriginalRoomData(editedResponseData.result.rooms);
    }
  }, [editedResponseData]);

  return (
    <StyledItemContainer ref={Ref}>
      <StyledItemHeader>
        <StyledLabel>{label}</StyledLabel>
        <StyledEdit onClick={openCloseEditComponent}>수정</StyledEdit>
      </StyledItemHeader>
      {isOpen ? (
        <StyledEditContainer>
          <StyledEditHeader>
            <div />
            <StyledCloseIcon onClick={openCloseEditComponent} />
          </StyledEditHeader>
          <>{editContents}</>
          <StyledEditFooter>
            <StyledCancelButton onClick={openCloseEditComponent}>취소</StyledCancelButton>
            <StyledPageNationDiv>
              <StyledMoveButton onClick={prevMove}>
                <GrPrevious size={20} />
              </StyledMoveButton>
              {`${currentRoomDataIndex + 1} / ${roomData.length}`}
              <StyledMoveButton onClick={nextMove}>
                <GrNext size={20} />
              </StyledMoveButton>
            </StyledPageNationDiv>
            <StyledEditButton onClick={dataPatch}>저장하기</StyledEditButton>
          </StyledEditFooter>
        </StyledEditContainer>
      ) : (
        <>{children}</>
      )}
    </StyledItemContainer>
  );
}

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgb(235, 235, 235);
  overflow: auto;
  box-sizing: border-box;
`;

const StyledItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledLabel = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const StyledEdit = styled.button`
  font-weight: 600;
  text-decoration: underline;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  box-sizing: border-box;

  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledEditContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgb(203, 202, 202);
`;

const StyledEditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledEditFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledCancelButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  text-decoration: underline;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledEditButton = styled.button`
  font-size: 18px;
  cursor: pointer;
  color: white;
  background-color: #212121;
  font-weight: 600;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const StyledPageNationDiv = styled.div`
  display: flex;
  align-items: center;
`;
const StyledMoveButton = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledCloseIcon = styled(AiOutlineClose)`
  padding: 10px;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
