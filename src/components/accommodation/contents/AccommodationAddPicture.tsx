import { useEffect, useCallback, useState, useRef, type DragEvent } from 'react';
import styled from 'styled-components';
import { TbPhotoPlus } from 'react-icons/tb';
import { AiOutlinePicture, AiOutlinePlus } from 'react-icons/ai';

interface ImageItem {
  image?: string;
  isFocused: boolean;
}

export default function AccommodationAddPicture() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [imageList, setImageList] = useState<ImageItem[]>([
    { image: '', isFocused: false },
    { image: '', isFocused: false },
    { image: '', isFocused: false },
    { image: '', isFocused: false },
  ]);

  const dragRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = (index: number) => {
    const updatedImageList = [...imageList];
    updatedImageList[index].isFocused = true;
    setImageList(updatedImageList);
    dragRef.current?.focus();
  };

  const handleFocusOut = (index: number) => {
    const updatedImageList = [...imageList];
    updatedImageList[index].isFocused = false;
    setImageList(updatedImageList);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    console.log('위에 있음');
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File | null = files.item(i);
        console.log(file);
      }
    }
  };

  //드래그 상태에서 over 일경우 스타일 변경
  //미리보기 파일로더로 변환 함수

  return (
    <StyledFlexDiv>
      {imageList.length === 0 && (
        <StyledContainer>
          <StyledImgIcon />
          <StyledContentTitle>여기로 사진을 끌어다 놓으세요.</StyledContentTitle>
          <StyledContentSubTitle>5장 이상의 사진을 선택하세요.</StyledContentSubTitle>
          <StyledLabel htmlFor="file" onDrop={onDrop} onDragOver={onDragOver}></StyledLabel>
          <StyledInput id="file" type="file" accept="image/*"></StyledInput>
        </StyledContainer>
      )}
      {imageList.length > 0 &&
        imageList.map((item, idx) => {
          if (idx === 0) {
            return (
              <StyledContainer key={idx}>
                <StyledImgIcon />
                <StyledContentTitle>여기로 사진을 끌어다 놓으세요.</StyledContentTitle>
                <StyledContentSubTitle>5장 이상의 사진을 선택하세요.</StyledContentSubTitle>
                <StyledLabel htmlFor={`file${idx}`} onDrop={onDrop} onDragOver={onDragOver}></StyledLabel>
                <StyledInput id={`file${idx}`} type="file" accept="image/*"></StyledInput>
              </StyledContainer>
            );
          }
          return (
            <StyledPlusContainer key={idx}>
              <StyledPlusImgIcon />
              <StyledPlusLabel htmlFor={`file${idx}`} onDrop={onDrop} onDragOver={onDragOver}></StyledPlusLabel>
              <StyledPlusInput id={`file${idx}`} type="file" accept="image/*"></StyledPlusInput>
            </StyledPlusContainer>
          );
        })}
      <StyledPlusContainer>
        <StyledLastImgIcon />
        <StyledPlusLabel htmlFor="filelast" onDrop={onDrop} onDragOver={onDragOver}></StyledPlusLabel>
        <StyledPlusInput id="filelast" type="file" accept="image/*"></StyledPlusInput>
        <StyledLastContentSubTitle>추가</StyledLastContentSubTitle>
      </StyledPlusContainer>
    </StyledFlexDiv>
  );
}

const StyledFlexDiv = styled.div`
  display: flex;
  width: 600px;
  flex-wrap: wrap;
  justify-content: space-between;
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

  margin-top: 30px;

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
