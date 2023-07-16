import styled from 'styled-components';

import { AccommodationDataType } from '../HostingMain';
import AccommodationOption from './AccommodationOption';
import DeleteCheckModal from '../../accommodation/contents/reuse/DeleteCheckModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useRecoilState, useRecoilValue } from 'recoil';
import { originalAccommodationListState, originalRoomListState } from '../../../recoil/hostingAtoms';
import { ACCOMMODATION_API } from '../../../constants/api/accommodationApi';

interface AccommodationItemProps {
  onClick: () => void;
  data: AccommodationDataType;
  isSelected: boolean;
  setAccommodationList: Dispatch<SetStateAction<AccommodationDataType[]>>;
}

export default function AccommodationItem({ onClick, data, isSelected, setAccommodationList }: AccommodationItemProps) {
  const [originalAccommodationList, setOriginalAccommodationList] = useRecoilState(originalAccommodationListState);
  const originalRoomList = useRecoilValue(originalRoomListState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { sendRequest, responseData } = useAuthorizedRequest<any>({});
  const { sendRequest: accommodationSendRequest, responseData: accommdationResponseData } = useAuthorizedRequest<any>(
    {},
  );
  const openCloseDeleteCheckModal = () => {
    setOpenModal(preState => !preState);
  };

  const deleteAccommodation = async () => {
    if (originalRoomList.length > 0) {
      alert('예약내역이 존재하기때문에 삭제하실 수 없습니다.');
      setOpenModal(false);
      return;
    }

    try {
      await sendRequest({ url: `/user/houses/${data.id}`, method: 'DELETE' });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!responseData) return;
    const fetchData = async () => {
      try {
        await accommodationSendRequest({ url: ACCOMMODATION_API });
      } catch (err) {
        console.log(err);
      }
    };

    if (responseData.isSuccess) {
      alert('숙소 삭제가 완료되었습니다.');
      fetchData();
      setOpenModal(false);
    } else {
      alert('숙소 삭제가 완료되지않았습니다.');
      setOpenModal(false);
    }
  }, [responseData]);

  useEffect(() => {
    if (!accommdationResponseData) return;
    if (accommdationResponseData.isSuccess) {
      setOriginalAccommodationList(accommdationResponseData.result);
      setAccommodationList(accommdationResponseData.result);
    }
  }, [accommdationResponseData]);

  return (
    <>
      <StyledItemContainer onClick={onClick} aria-checked={isSelected}>
        {isSelected && <Dimmed />}
        {isSelected && <AccommodationOption onClick={openCloseDeleteCheckModal} houseId={data.id} />}
        <StyledItemTypeName>{data.houseType}</StyledItemTypeName>
        <StyledImg src={data.imageUrl} />
        <StyledItemName>{data.name}</StyledItemName>
      </StyledItemContainer>
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

const StyledItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 10px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #359da450;
  box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.5);
  z-index: 10;
  &:hover {
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.5);
  }

  ${({ 'aria-checked': ariaChecked }) => {
    if (ariaChecked === true) {
      return `
      pointer-events: none;
      `;
    }
  }}
`;

const Dimmed = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

const StyledItemTypeName = styled.span`
  color: white;
  background-color: #009ca6;
  text-align: center;
  padding: 8px;
  border-radius: 20px 20px 0 0;
  box-shadow: inset 0 0 5px 0.5px rgba(0, 0, 0, 0.2);
`;

const StyledItemName = styled.span`
  padding: 8px;
  text-align: center;
  background-color: #ecf7f8da;
  border-radius: 0 0 20px 20px;
`;
