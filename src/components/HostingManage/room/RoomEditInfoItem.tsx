import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { TbPhotoPlus } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';

import {
  accommodationDataState,
  formDataState,
  originalRoomDataState,
  patchRoomReqState,
  roomDataState,
} from '../../../recoil/hostingManageAtoms';

import DeleteCheckModal from '../../accommodation/contents/reuse/DeleteCheckModal';

import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import imageReader from '../../../utils/imageReader';
import RoomEditOption from './RoomEditOption';

interface RoomEditInfoItemProps {
  idx: number;
}

export default function RoomEditInfoItem({ idx }: RoomEditInfoItemProps) {
  const { sendRequest, responseData } = useAuthorizedRequest<any>({});
  const { sendRequest: accommodationSendRequest, responseData: accommdationResponseData } = useAuthorizedRequest<any>(
    {},
  );

  const accommodationData = useRecoilValue(accommodationDataState);
  const [roomData, setRoomData] = useRecoilState(roomDataState);
  const [originalRoomData, setOriginalRoomData] = useRecoilState(originalRoomDataState);
  const [patchRoomReq, setPatchRoomReq] = useRecoilState(patchRoomReqState);

  const [formData, setFormData] = useRecoilState(formDataState);

  const [isClicked, setIsClicked] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsClicked(true);
    if (roomData.length === 1) {
      alert('최소 1개의 객실이 존재해야합니다.');
    } else {
      setIsOpenModal(true);
    }
  };

  const deleteRoomItem = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await sendRequest({ url: `/user/rooms/${roomData[idx].roomId}`, method: 'DELETE' });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!responseData) return;
    const fetchData = async () => {
      try {
        await accommodationSendRequest({ url: `/api/houses/${accommodationData.houseId}`, method: 'POST' });
      } catch (err) {
        console.log(err);
      }
    };

    if (responseData.isSuccess) {
      fetchData();
      setOriginalRoomData(roomData);
      alert('객실 삭제가 완료되었습니다.');
      setIsOpenModal(false);
    } else {
      alert('객실 삭제가 완료되지않았습니다.');
    }
  }, [responseData]);

  useEffect(() => {
    if (!accommdationResponseData) return;
    if (accommdationResponseData.isSuccess) {
      setRoomData(accommdationResponseData.result.rooms);
      setOriginalRoomData(accommdationResponseData.result.rooms);
    }
  }, [accommdationResponseData]);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file?.[0]) {
      const imageDataValues = Array.from(formData.getAll('roomImages'));
      const newFormData = new FormData();
      formData.forEach((value, key) => {
        newFormData.append(key, value);
      });

      try {
        const result = (await imageReader(file[0])) as string;

        const newRoomData = [...roomData];
        const newRoom = { ...newRoomData[idx] };
        newRoom.roomImages = [...newRoom.roomImages, result];
        newRoomData[idx] = newRoom;

        const newPatchRoomReq = { ...patchRoomReq };
        newPatchRoomReq.patchImageReqs = [...newPatchRoomReq.patchImageReqs];

        imageDataValues.push(file[0]);
        newPatchRoomReq.patchImageReqs.push({
          imageCount: newRoomData[idx].roomImages.length - 1,
          imageStatus: 'ADD',
        });

        newFormData.delete('roomImages');
        imageDataValues.forEach(value => newFormData.append('roomImages', value));

        setFormData(newFormData);
        setRoomData(newRoomData);
        setPatchRoomReq(newPatchRoomReq);
      } catch (err) {
        console.log(err);
      }
    }
  };

  /**같은 이미지를 연속으로 업로드할때 필요한 함수 */
  const resetFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const deleteCheck = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedImageIndex(index);
  };

  const deleteRoomImage = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newRoomData = [...roomData];
    const newRoom = { ...newRoomData[idx] };
    newRoom.roomImages = [...newRoom.roomImages];
    newRoom.roomImages.splice(index, 1);
    newRoomData[idx] = newRoom;

    const newPatchRoomReq = { ...patchRoomReq };
    newPatchRoomReq.patchImageReqs = [...newPatchRoomReq.patchImageReqs];

    newPatchRoomReq.patchImageReqs.push({
      imageCount: index,
      imageStatus: 'DELETE',
    });

    setRoomData(newRoomData);
    setPatchRoomReq(newPatchRoomReq);
    setSelectedImageIndex(9999);

    const newFormData = new FormData();
    formData.forEach((value, key) => {
      newFormData.append(key, value);
    });

    newFormData.delete('roomImages');
    setFormData(newFormData);
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setSelectedImageIndex(9999);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <StyledRoomContentsContainer>
      <StyledContainer>
        <StyledFlexDiv>
          <StyledImageContainer>
            {roomData[idx].roomImages.length === 0 ? (
              <StyledNoImageContainer>
                <StyledImgIcon />
                <StyledLabel htmlFor="file"></StyledLabel>
                <StyledInput onChange={handleOnChange} id="file" type="file" accept="image/*"></StyledInput>
              </StyledNoImageContainer>
            ) : (
              <StyledCoverImageContainer onClick={deleteCheck(0)}>
                {selectedImageIndex === 0 && (
                  <StyledDeleteImageDimmed ref={divRef} onClick={deleteRoomImage(0)}>
                    <MdDeleteForever size={50}></MdDeleteForever>
                  </StyledDeleteImageDimmed>
                )}
                <StyledImage src={roomData[idx].roomImages[0]} alt="이미지" />
              </StyledCoverImageContainer>
            )}
            <StyledCarouselDiv>
              {roomData[idx].roomImages.map((item, index) => {
                if (index === 0) {
                  return null;
                } else {
                  return (
                    <StyledPlusImageContainer key={`image ${index}`} onClick={deleteCheck(index)}>
                      {selectedImageIndex === index && (
                        <StyledDeleteImageDimmed ref={divRef} onClick={deleteRoomImage(index)}>
                          <MdDeleteForever size={50}></MdDeleteForever>
                        </StyledDeleteImageDimmed>
                      )}
                      <StyledImage src={item} alt="이미지" />
                    </StyledPlusImageContainer>
                  );
                }
              })}
              {roomData[idx].roomImages.length !== 0 && roomData[idx].roomImages.length < 5 && (
                <StyledPlusImageContainer>
                  <StyledLastImgIcon />
                  <StyledPlusLabel htmlFor={`fileLast ${idx}`}></StyledPlusLabel>
                  <StyledPlusInput
                    ref={inputRef}
                    onChange={handleOnChange}
                    id={`fileLast ${idx}`}
                    type="file"
                    accept="image/*"
                    onClick={resetFileInput}
                  />
                </StyledPlusImageContainer>
              )}
            </StyledCarouselDiv>
          </StyledImageContainer>

          <RoomEditOption idx={idx} />
        </StyledFlexDiv>

        <StyledCloseIcon size={40} onClick={openModal}></StyledCloseIcon>

        {isOpenModal && (
          <DeleteCheckModal
            label="해당 객실을 제거하시겠습니까?"
            body="수정을 거치지 않고 바로 삭제되니 주의바랍니다."
            onClose={() => {
              setIsOpenModal(false);
            }}
            handleOnButton={deleteRoomItem}
          />
        )}
      </StyledContainer>
    </StyledRoomContentsContainer>
  );
}

const StyledRoomContentsContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 50px;
  }
  background-color: #00acb51c;
  border-radius: 20px;
  box-shadow: 3px 2px 1px 1px rgba(0, 0, 0, 0.1);
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 635px) {
    flex-direction: row;
    align-items: normal;
  }
`;

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 635px) {
    flex-direction: row;
  }
`;

const StyledCloseIcon = styled(AiOutlineClose)`
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  height: 90%;
  padding: 20px;
  box-sizing: content-box;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;

  @media (min-width: 635px) {
    width: 300px;
  }
`;
const StyledNoImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  border: 2px dotted rgba(0, 0, 0, 0.2);
  &:hover {
    border: 2px solid black;
  }
`;

const StyledCoverImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 230px;
  z-index: 1;
  &:hover {
    border: 2px solid black;
  }
`;

const StyledLabel = styled.label`
  z-index: 10;
  width: 100%;
  height: 310px;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledImgIcon = styled(TbPhotoPlus)`
  position: absolute;
  top: 40%;
  font-size: 40px;
  z-index: -1;
`;

const StyledCarouselDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPlusImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 90px;
  align-items: center;
  z-index: 10;

  &:hover {
    border: 2px solid black;
  }

  @media (min-width: 635px) {
    width: 100px;
  }
`;

const StyledDeleteImageDimmed = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100%;
  z-index: 100;
  border: 3px dashed black;

  &:hover {
    border: none;
  }
`;

const StyledPlusLabel = styled.label`
  z-index: 10;
  width: 100%;
  height: 90px;
`;

const StyledPlusInput = styled.input`
  display: none;
`;

const StyledLastImgIcon = styled(AiOutlinePlus)`
  position: absolute;
  top: 20px;
  font-size: 40px;
  z-index: -1;
  color: rgba(0, 0, 0, 0.4);
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
