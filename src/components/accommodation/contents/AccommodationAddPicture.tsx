import { useEffect, useCallback, useState, useRef, type DragEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { TbPhotoPlus } from 'react-icons/tb';
import { AiOutlinePicture, AiOutlinePlus } from 'react-icons/ai';

import ImageOption from './ImageOption';
import imageReader from '../../../utils/imageReader';
export interface ImageItem {
  image?: string;
  isFocused: boolean;
}
export default function AccommodationAddPicture() {
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [imageList, setImageList] = useState<ImageItem[]>([
    { image: '', isFocused: false },
    { image: '', isFocused: false },
    { image: '', isFocused: false },
    { image: '', isFocused: false },
  ]);

  const dragRef = useRef<HTMLInputElement>(null);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file?.[0]) {
      try {
        const result = (await imageReader(file[0])) as string;
        const newImageList = [...imageList];

        if (newImageList.some(item => item.image === '')) {
          const index = newImageList.findIndex(item => item.image === '');
          newImageList.splice(index, 1, { image: result, isFocused: false });
        } else {
          newImageList.push({ image: result, isFocused: false });
        }

        setImageList(newImageList);
      } catch (err) {
        console.log(err);
      }
    }
  };
  // const handleLabelClick = (index: number) => {
  //   const updatedImageList = [...imageList];
  //   updatedImageList[index].isFocused = true;
  //   setImageList(updatedImageList);
  //   dragRef.current?.focus();
  // };

  // const handleFocusOut = (index: number) => {
  //   const updatedImageList = [...imageList];
  //   updatedImageList[index].isFocused = false;
  //   setImageList(updatedImageList);
  // };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    console.log('위에 있음');
    setIsDragOver(true);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File | null = files.item(i);
        console.log(file);
      }
    }
  };

  return (
    <StyledFlexDiv onDragLeave={onDragLeave}>
      {imageList[0]?.image === '' && (
        <StyledContainer>
          <StyledImgIcon />
          <StyledContentTitle>여기로 사진을 끌어다 놓으세요.</StyledContentTitle>
          <StyledContentSubTitle>5장 이상의 사진을 선택하세요.</StyledContentSubTitle>
          <StyledLabel htmlFor="file" onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}></StyledLabel>
          <StyledInput onChange={handleOnChange} id="file" type="file" accept="image/*"></StyledInput>
        </StyledContainer>
      )}
      {imageList[0]?.image !== '' &&
        imageList.map((item, idx) => {
          if (idx === 0) {
            return (
              <StyledContainer key={idx}>
                <ImageOption index={idx} setImageList={setImageList} imageList={imageList} />
                <StyledImage src={item.image} alt="이미지" />
              </StyledContainer>
            );
          }
          return (
            <>
              {item.image === '' ? (
                <StyledPlusContainer>
                  <StyledPlusImgIcon />
                  <StyledPlusLabel
                    htmlFor="file"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                  ></StyledPlusLabel>
                  <StyledPlusInput onChange={handleOnChange} id="file" type="file" accept="image/*"></StyledPlusInput>
                </StyledPlusContainer>
              ) : (
                <StyledPlusContainer key={idx}>
                  <ImageOption index={idx} setImageList={setImageList} imageList={imageList} />
                  <StyledImage src={item.image} alt="이미지" />
                </StyledPlusContainer>
              )}
            </>
          );
        })}
      {imageList[0]?.image !== '' && (
        <StyledPlusContainer>
          <StyledLastImgIcon />
          <StyledPlusLabel
            htmlFor="filelast"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          ></StyledPlusLabel>
          <StyledPlusInput onChange={handleOnChange} id="filelast" type="file" accept="image/*"></StyledPlusInput>
          <StyledLastContentSubTitle>추가</StyledLastContentSubTitle>
        </StyledPlusContainer>
      )}
    </StyledFlexDiv>
  );
}

const StyledFlexDiv = styled.div`
  display: flex;
  width: 600px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 330px;
  border: 2px dotted rgba(0, 0, 0, 0.2);
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
  width: 290px;
  height: 200px;
  align-items: center;
  border: 2px dotted rgba(0, 0, 0, 0.2);
  z-index: 100;

  margin-top: 30px;

  &:hover {
    border: 2px solid black;
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
