import { useRef, ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TbPhotoPlus } from 'react-icons/tb';
import { AiOutlinePicture, AiOutlinePlus } from 'react-icons/ai';

import ImageOption from './ImageOption';
import imageReader from '../../../../utils/imageReader';
import { useRecoilState } from 'recoil';
import { imageDataState, imageListState, disabledState } from '../../../../recoil/accommodationAtoms';

export default function AccommodationAddPicture() {
  const [disabled, setDisabled] = useRecoilState(disabledState);
  const [imageData, setImageData] = useRecoilState(imageDataState);
  const [imageList, setImageList] = useRecoilState(imageListState);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    const files = 'dataTransfer' in e ? e.dataTransfer?.files : e.target?.files;

    if (files && files?.length + imageList.length > 5) {
      alert('이미지는 최대 5장까지 업로드 가능합니다.');
      return;
    }

    if (files && files?.length > 0) {
      const newImageList = [...imageList];
      const newImageData = new FormData();

      imageData.forEach((value, key) => {
        newImageData.append(key, value);
      });

      for (const file of files) {
        if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
          alert('이미지 형식 파일을 업로드해주세요.');
          return;
        }

        try {
          const result = (await imageReader(file)) as string;

          newImageData.append('houseImages', file);

          if (newImageList.some(item => item.image === '')) {
            const index = newImageList.findIndex(item => item.image === '');
            newImageList.splice(index, 1, { image: result, isFocused: false });
          } else {
            newImageList.push({ image: result, isFocused: false });
          }
        } catch (err) {
          console.log(err);
        }
      }

      setImageData(newImageData);
      setImageList(newImageList);
    }
  };

  useEffect(() => {
    if (imageList.length < 5) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [imageList]);

  /**같은 이미지를 연속으로 업로드할때 필요한 함수 */
  const resetFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleOnDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (imageList.length === 5) return setIsDragOver(false);
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(true);
    }
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (imageList.length === 5) {
      setIsDragOver(false);
    } else {
      setIsDragOver(true);
    }
  };

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (imageList.length === 5) {
      return;
    }
    handleOnChange(e);
  };

  const handleOnDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  return (
    <StyledFlexDiv
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
    >
      {isDragOver && imageList.length < 5 && (
        <StyledUploadContainer>
          <StyledUploadImgIcon />
        </StyledUploadContainer>
      )}
      {!isDragOver && imageList[0]?.image === '' && (
        <StyledContainer onDragOver={handleOnDragOver} onDragEnter={handleOnDragEnter} onDragLeave={handleOnDragLeave}>
          <StyledImgIcon />
          <StyledContentTitle>이미지 파일 드래그 또는 클릭을 통해 사진을 업로드하세요.</StyledContentTitle>
          <StyledContentSubTitle>5장의 사진을 선택하세요.</StyledContentSubTitle>
          <StyledLabel htmlFor="file"></StyledLabel>
          <StyledInput onChange={handleOnChange} id="file" type="file" accept="image/*" multiple></StyledInput>
        </StyledContainer>
      )}
      {!isDragOver &&
        imageList[0]?.image !== '' &&
        imageList.map((item, idx) => {
          if (idx === 0) {
            return (
              <StyledContainer key={idx}>
                <ImageOption index={idx} setImageList={setImageList} imageList={imageList} />
                <StyledImage src={item.image} alt="이미지" />
              </StyledContainer>
            );
          } else {
            return (
              <StyledPlusContainer key={idx}>
                <ImageOption index={idx} setImageList={setImageList} imageList={imageList} />
                <StyledImage src={item.image} alt="이미지" />
              </StyledPlusContainer>
            );
          }
        })}
      {!isDragOver && imageList[0]?.image !== '' && imageList.length < 5 && (
        <StyledPlusContainer>
          <StyledLastImgIcon />
          <StyledPlusLabel htmlFor="fileLast"></StyledPlusLabel>
          <StyledPlusInput
            ref={inputRef}
            onChange={handleOnChange}
            id="fileLast"
            type="file"
            accept="image/*"
            onClick={resetFileInput}
            multiple
          ></StyledPlusInput>
          <StyledLastContentSubTitle>추가</StyledLastContentSubTitle>
        </StyledPlusContainer>
      )}
    </StyledFlexDiv>
  );
}

const StyledFlexDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;

  @media (min-width: 780px) {
    width: 600px;
  }
`;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 330px;
  border: 2px dotted rgba(0, 0, 0, 0.2);
  z-index: 1;

  &:hover {
    border: 2px solid black;
  }
`;

const StyledUploadContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 330px;
  border: 5px dotted rgba(0, 0, 0, 0.5);
  z-index: 1;

  &:hover {
    border: 2px solid black;
  }
`;

const StyledLabel = styled.label`
  z-index: 10;
  width: 600px;
  height: 330px;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledImgIcon = styled(TbPhotoPlus)`
  position: absolute;
  top: 100px;
  font-size: 80px;
  z-index: -1;
`;

const StyledUploadImgIcon = styled(TbPhotoPlus)`
  position: absolute;
  top: 120px;
  font-size: 80px;
  z-index: -1;
`;

const StyledContentTitle = styled.p`
  position: absolute;
  z-index: -1;
  top: 190px;
  text-align: center;
  font-weight: 600;
`;

const StyledContentSubTitle = styled.p`
  position: absolute;
  z-index: -1;
  top: 220px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
`;

const StyledPlusContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 200px;
  align-items: center;
  border: 2px dotted rgba(0, 0, 0, 0.2);
  z-index: 10;

  margin-top: 30px;

  &:hover {
    border: 2px solid black;
  }

  @media (min-width: 780px) {
    width: 290px;
    height: 200px;
  }
`;

const StyledPlusLabel = styled.label`
  z-index: 10;
  width: 290px;
  height: 200px;
`;

const StyledPlusInput = styled.input`
  display: none;
`;

const StyledPlusImgIcon = styled(AiOutlinePicture)`
  position: absolute;
  top: 80px;
  font-size: 40px;
  z-index: -1;
  color: rgba(0, 0, 0, 0.4);
`;

const StyledLastImgIcon = styled(AiOutlinePlus)`
  position: absolute;
  top: 70px;
  font-size: 40px;
  z-index: -1;
  color: rgba(0, 0, 0, 0.4);
`;

const StyledLastContentSubTitle = styled.p`
  position: absolute;
  z-index: -1;
  top: 120px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
