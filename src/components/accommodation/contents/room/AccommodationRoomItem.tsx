import { useRef, ChangeEvent, useState, Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { TbPhotoPlus } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import { useRecoilState } from 'recoil';

import { imageDataState, accommodationState, roomImageListState } from '../../../../recoil/accommodationAtoms';
import DeleteCheckModal from '../reuse/DeleteCheckModal';
import imageReader from '../../../../utils/imageReader';
import AccommodationRoomOption from './AccommodationRoomOption';

export interface RoomDataProps {
  idx: number;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}

export default function AccommodationRoomItem({ idx, setIsClicked }: RoomDataProps) {
  const [imageData, setImageData] = useRecoilState(imageDataState);
  const [accommodation, setAccommodation] = useRecoilState(accommodationState);
  const [roomImageList, setRoomImageList] = useRecoilState(roomImageListState);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsClicked(true);
    if (accommodation.rooms.length === 1) {
      alert('최소 1개의 객실이 존재해야합니다.');
    } else {
      setIsOpenModal(true);
    }
  };

  const deleteRoomItem = () => {
    const newRoomImageList = [...roomImageList];

    const newImageData = new FormData();
    imageData.forEach((value, key) => {
      newImageData.append(key, value);
    });

    if (idx > 0) {
      let deleteStartIndex = 0;

      for (let i = 0; i < idx; i++) {
        deleteStartIndex += newRoomImageList[i].length;
      }

      const deleteCount = newRoomImageList[idx].length;

      const imageDataValue = newImageData.getAll('roomImages');

      imageDataValue.splice(deleteStartIndex, deleteCount);

      newImageData.delete('roomImages');
      imageDataValue.forEach(value => {
        newImageData.append('roomImages', value);
      });
    } else {
      const deleteCount = newRoomImageList[idx].length;
      const imageDataValue = newImageData.getAll('roomImages');

      imageDataValue.splice(0, deleteCount);

      newImageData.delete('roomImages');
      imageDataValue.forEach(value => {
        newImageData.append('roomImages', value);
      });
    }

    const newAccommodation = { ...accommodation };
    newAccommodation.rooms = [...accommodation.rooms];
    newAccommodation.rooms.splice(idx, 1);
    newRoomImageList.splice(idx, 1);

    setImageData(newImageData);
    setAccommodation(newAccommodation);
    setRoomImageList(newRoomImageList);
    setIsOpenModal(false);
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file?.[0]) {
      try {
        const newRoomImageList = [...roomImageList];
        const result = (await imageReader(file[0])) as string;
        newRoomImageList[idx] = [...roomImageList[idx], result];

        const newAccommodation = { ...accommodation };
        const newRooms = { ...newAccommodation.rooms[idx], imageCount: newAccommodation.rooms[idx].imageCount + 1 };
        newAccommodation.rooms = [
          ...newAccommodation.rooms.slice(0, idx),
          newRooms,
          ...newAccommodation.rooms.slice(idx + 1),
        ];

        const newImageData = new FormData();
        imageData.forEach((value, key) => {
          newImageData.append(key, value);
        });

        if (idx > 0) {
          let addStartIndex = 0;

          for (let i = 0; i < idx; i++) {
            addStartIndex += newRoomImageList[i].length;
          }

          const changeIndex = newRoomImageList[idx].length;

          const imageDataValue = newImageData.getAll('roomImages');
          imageDataValue.splice(addStartIndex - 1 + changeIndex, 0, file[0]);

          newImageData.delete('roomImages');
          imageDataValue.forEach(value => {
            newImageData.append('roomImages', value);
          });
        } else {
          const changeIndex = newRoomImageList[idx].length - 1;

          const imageDataValue = newImageData.getAll('roomImages');
          imageDataValue.splice(changeIndex, 0, file[0]);

          newImageData.delete('roomImages');
          imageDataValue.forEach(value => {
            newImageData.append('roomImages', value);
          });
        }

        setAccommodation(newAccommodation);
        setImageData(newImageData);
        setRoomImageList(newRoomImageList);
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

    const newRoomImageList = [...roomImageList.map(arr => [...arr])];

    const newImageData = new FormData();
    imageData.forEach((value, key) => {
      newImageData.append(key, value);
    });

    if (idx > 0) {
      let deleteStartIndex = 0;

      for (let i = 0; i < idx; i++) {
        deleteStartIndex += newRoomImageList[i].length;
      }

      const imageDataValue = newImageData.getAll('roomImages');

      imageDataValue.splice(deleteStartIndex + index, 1);

      newImageData.delete('roomImages');
      imageDataValue.forEach(value => {
        newImageData.append('roomImages', value);
      });
    } else {
      const imageDataValue = newImageData.getAll('roomImages');

      imageDataValue.splice(index, 1);

      newImageData.delete('roomImages');
      imageDataValue.forEach(value => {
        newImageData.append('roomImages', value);
      });
    }
    newRoomImageList[idx].splice(index, 1);

    const newAccommodation = { ...accommodation };
    const newRooms = { ...newAccommodation.rooms[idx], imageCount: newAccommodation.rooms[idx].imageCount - 1 };
    newAccommodation.rooms = [
      ...newAccommodation.rooms.slice(0, idx),
      newRooms,
      ...newAccommodation.rooms.slice(idx + 1),
    ];

    setAccommodation(newAccommodation);
    setImageData(newImageData);
    setRoomImageList(newRoomImageList);
    setSelectedImageIndex(9999);
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
    <StyledContainer>
      <StyledFlexDiv>
        <StyledImageContainer>
          {roomImageList[idx].length === 0 ? (
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
              <StyledImage src={roomImageList[idx][0]} alt="이미지" />
            </StyledCoverImageContainer>
          )}
          <StyledCarouselDiv>
            {roomImageList[idx].map((item, index) => {
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
            {roomImageList[idx].length !== 0 && roomImageList[idx].length < 5 && (
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

        <AccommodationRoomOption idx={idx} setIsClicked={setIsClicked} />
      </StyledFlexDiv>

      <StyledCloseIcon size={38} onClick={openModal}></StyledCloseIcon>

      {isOpenModal && (
        <DeleteCheckModal
          label="해당 객실을 제거하시겠습니까?"
          onClose={() => {
            setIsOpenModal(false);
          }}
          handleOnButton={deleteRoomItem}
        />
      )}
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 680px) {
    flex-direction: row;
    align-items: normal;
  }
`;

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 680px) {
    flex-direction: row;
    height: 400px;
  }
`;

const StyledCloseIcon = styled(GrFormClose)`
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
  padding: 20px;
  height: 82%;
  box-sizing: content-box;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;

  @media (min-width: 680px) {
    width: 300px;
  }
`;
const StyledNoImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  justify-content: space-between;
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

  @media (min-width: 680px) {
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
