import styled from 'styled-components';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageSlide from '../../../../hooks/useImageSlide';
import ImageSlide from '../../../shared/ImageSlide';
import { HiArrowSmLeft } from 'react-icons/hi';

interface ImageBoxProps {
  imageList: string[];
  isOver?: boolean;
}

const iconStyle = {
  position: 'absolute' as const,
  backgroundColor: 'white',
  borderRadius: '100%',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  boxShadow: '3px 3px 6px -1px rgb(0 0 0 / 0.3)',
  display: 'flex',
  alignItems: 'center',
};

export default function ImageBox({ imageList, isOver }: ImageBoxProps) {
  const processRef = useRef<HTMLDivElement>(null);
  const { nextImage, prevImage, currentIdx } = useImageSlide({ imageList, processRef });
  const navigation = useNavigate();

  return (
    <StyleImageContainer>
      <ImageSlide currentIdx={currentIdx} imageList={imageList} processRef={processRef} />
      {!isOver && (
        <div
          onClick={() => {
            navigation(-1);
          }}
          style={{ ...iconStyle, top: '20px', left: '20px' }}
        >
          <HiArrowSmLeft style={{ width: '100%' }} size={15} />
        </div>
      )}
      {imageList.length > 1 && (
        <div onClick={prevImage} style={{ ...iconStyle, bottom: '20px', left: '20px' }}>
          <MdOutlineArrowBackIos style={{ width: '100%' }} size={15} />
        </div>
      )}
      {imageList.length > 1 && (
        <div onClick={nextImage} style={{ ...iconStyle, bottom: '20px', right: '20px' }}>
          <MdOutlineArrowForwardIos style={{ width: '100%' }} size={15} />
        </div>
      )}
    </StyleImageContainer>
  );
}

const StyleImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 330px;
  position: relative;

  @media only screen and (min-width: 738px) {
    height: 400px;
  }
`;
