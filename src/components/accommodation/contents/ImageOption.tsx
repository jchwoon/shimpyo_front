import { useState, ChangeEvent, MouseEvent } from 'react';
import { SlOptions } from 'react-icons/sl';
import styled from 'styled-components';

import { type ImageItem } from './AccommodationAddPicture';
import imageReader from '../../../utils/imageReader';

interface ImageOptionProps {
  index: number;
  setImageList: (imageList: ImageItem[]) => void;
  imageList: ImageItem[];
}

export default function ImageOption({ index, setImageList, imageList }: ImageOptionProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsClicked(preState => !preState);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  const deleteImage = (index: number) => () => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);

    if (newImageList.length < 4) {
      newImageList.push({ image: '', isFocused: false });
    }

    setImageList(newImageList);
  };

  const editImage = (index: number) => async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file?.[0]) {
      try {
        const result = (await imageReader(file[0])) as string;
        const newImageList = [...imageList];
        newImageList.splice(index, 1, { image: result, isFocused: false });
        setImageList(newImageList);

        setIsClicked(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <StyledRelativeDiv>
      <StyledBtn onClick={handleOnClick} onBlur={handleOnBlur}>
        <SlOptions />
      </StyledBtn>

      {isClicked && (
        <StyledOptionContainer>
          <StyledOption>
            <StyleLabel htmlFor="editFile">수정하기</StyleLabel>
            <StyledInput onChange={editImage(index)} id="editFile" type="file" accept="image/*" />
          </StyledOption>
          <StyledOption onClick={deleteImage(index)}>삭제</StyledOption>
        </StyledOptionContainer>
      )}
    </StyledRelativeDiv>
  );
}

const StyledRelativeDiv = styled.div`
  position: absolute;
  top: 8%;
  right: 5%;
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: transform 0.25s ease-in-out;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: scale(1.04);
    box-shadow: 0 0 0 4px transparent;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

const StyledOptionContainer = styled.div`
  width: 100px;
  background-color: white;
  position: absolute;
  right: 20%;
  top: 120%;

  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 0;
`;

const StyledOption = styled.li`
  list-style: none;
  font-size: 13px;
  cursor: pointer;
  text-indent: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    padding: 10px 0;
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const StyleLabel = styled.label`
  display: block;
  cursor: pointer;
  padding: 10px 0;
`;
