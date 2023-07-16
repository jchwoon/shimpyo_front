import styled from 'styled-components';
import ImageOption from './ImageOption';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { accommodationDataState, formDataState, patchHouseReqState } from '../../../recoil/hostingManageAtoms';
import { ChangeEvent, useRef } from 'react';
import imageReader from '../../../utils/imageReader';

interface AccommodationEditPictureProps {
  images: Array<string>;
}

export default function AccommodationEditPicture({ images }: AccommodationEditPictureProps) {
  const [accommodationData, setAccommodationData] = useRecoilState(accommodationDataState);
  const [patchHouseReq, setPatchHouseReq] = useRecoilState(patchHouseReqState);
  const [formData, setFormData] = useRecoilState(formDataState);

  const inputRef = useRef<HTMLInputElement>(null);

  const addPicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file?.[0]) {
      const imageDataValues = Array.from(formData.getAll('houseImages'));
      const newFormData = new FormData();
      formData.forEach((value, key) => {
        newFormData.append(key, value);
      });

      try {
        const result = (await imageReader(file[0])) as string;

        const newAccommodationData = { ...accommodationData };
        newAccommodationData.houseImages = [...newAccommodationData.houseImages];

        const newPatchHouseReq = { ...patchHouseReq };
        newPatchHouseReq.patchImageReqs = [...newPatchHouseReq.patchImageReqs];

        newAccommodationData.houseImages.push(result);
        imageDataValues.push(file[0]);
        newPatchHouseReq.patchImageReqs.push({
          imageCount: newAccommodationData.houseImages.length,
          imageStatus: 'ADD',
        });

        newFormData.delete('houseImages');
        imageDataValues.forEach(value => newFormData.append('houseImages', value));

        setFormData(newFormData);
        setAccommodationData(newAccommodationData);
        setPatchHouseReq(newPatchHouseReq);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const resetFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <StyledGridDiv>
      {images.map((image, idx) => {
        return (
          <StyledContainer key={idx}>
            <ImageOption index={idx} />
            <StyledImage src={image} alt="이미지" />
          </StyledContainer>
        );
      })}
      {images.length < 5 && (
        <StyledContainer>
          <StyledLastImgIcon />
          <StyledPlusLabel htmlFor="fileLast"></StyledPlusLabel>
          <StyledPlusInput
            ref={inputRef}
            id="fileLast"
            type="file"
            accept="image/*"
            onChange={addPicture}
            onClick={resetFileInput}
          ></StyledPlusInput>
          <StyledLastContentSubTitle>추가</StyledLastContentSubTitle>
        </StyledContainer>
      )}
    </StyledGridDiv>
  );
}

const StyledGridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 2px dotted rgba(0, 0, 0, 0.2);
  z-index: 1;

  &:hover {
    border: 2px solid black;
  }
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const StyledPlusLabel = styled.label`
  z-index: 10;
  width: 290px;
  height: 200px;
`;

const StyledPlusInput = styled.input`
  display: none;
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
