import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AiOutlineClose } from 'react-icons/ai';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  accommodationDataState,
  formDataState,
  originalAccommodationDataState,
  originalPatchHouseReqState,
  originalRoomDataState,
  patchHouseReqState,
  roomDataState,
} from '../../../recoil/hostingManageAtoms';
import { AccommodationData } from '../HostingManageMain';

interface AccommodationInfoItemProps {
  Ref: React.RefObject<HTMLDivElement>;
  label: string;
  children: ReactNode;
  editContents: ReactNode;
  houseId: string | undefined;
}

export default function AccommodationInfoItem({
  Ref,
  label,
  children,
  editContents,
  houseId,
}: AccommodationInfoItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { sendRequest, responseData } = useAuthorizedRequest<any>({});
  const { sendRequest: editedSendRequest, responseData: editedResponseData } = useAuthorizedRequest<any>({});

  const [originalAccommodationData, setOriginalAccommodationData] = useRecoilState(originalAccommodationDataState);
  const [originalRoomData, setOriginalRoomData] = useRecoilState(originalRoomDataState);
  const [originalPatchHouseReq, setOriginalPatchHouseReq] = useRecoilState(originalPatchHouseReqState);

  const [accommodationData, setAccommodationData] = useRecoilState(accommodationDataState);
  const [roomData, setRoomData] = useRecoilState(roomDataState);
  const [patchHouseReq, setPatchHouseReq] = useRecoilState(patchHouseReqState);
  const formData = useRecoilValue(formDataState);

  const openCloseEditComponent = () => {
    setAccommodationData(originalAccommodationData);
    setRoomData(originalRoomData);
    setPatchHouseReq(originalPatchHouseReq);

    setIsOpen(preState => !preState);
  };

  const dataPatch = async () => {
    const newFormData = new FormData();
    formData.forEach((value, key) => {
      newFormData.append(key, value);
    });

    if (accommodationData.houseImages.length < 5) {
      alert('숙소 사진을 5장 등록해주세요.');
      return;
    }

    newFormData.delete('patchHouseReq');

    newFormData.append('patchHouseReq', new Blob([JSON.stringify(patchHouseReq)], { type: 'application/json' }));

    try {
      await sendRequest({ url: `/user/houses/${houseId}`, method: 'PATCH', body: newFormData });
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
      alert('숙소 수정이 완료되었습니다.');

      setIsOpen(preState => !preState);
    } else {
      alert('숙소 수정을 하지못했습니다.');
    }
  }, [responseData]);

  useEffect(() => {
    if (!editedResponseData) return;
    if (editedResponseData.isSuccess) {
      setAccommodationData(editedResponseData.result.house);
      setRoomData(editedResponseData.result.rooms);
      setOriginalAccommodationData(editedResponseData.result.house);
      setOriginalRoomData(editedResponseData.result.rooms);

      const { name, type, options, contents, postCode, sido, sigungu, fullAddress, lat, lng }: AccommodationData =
        editedResponseData.result.house;
      const option = { wifi: false, pc: false, parking: false, bbq: false };
      if (options.length > 0) {
        options.forEach((v, i) => (option[v] = true));
      }

      const newPatchData = {
        name,
        type,
        option,
        contents,
        address: { postCode, sido, sigungu, fullAddress, lat, lng },
        patchImageReqs: [],
      };

      setPatchHouseReq(newPatchData);
      setOriginalPatchHouseReq(newPatchData);
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

const StyledCloseIcon = styled(AiOutlineClose)`
  padding: 10px;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
