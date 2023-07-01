import styled from 'styled-components';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos, MdArrowBack } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ImageBoxProps {
  imageList: string[];
}

const iconStyle = {
  position: 'absolute' as const,
  backgroundColor: 'white',
  borderRadius: '100%',
  padding: '0.5rem',
  cursor: 'pointer',
  boxShadow: '3px 3px 6px -1px rgb(0 0 0 / 0.3)',
};

export default function ImageBox({ imageList }: ImageBoxProps) {
  const processRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const navigation = useNavigate();

  const nextImage = () => {
    if (currentIdx === imageList.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentIdx === 0) {
      setCurrentIdx(imageList.length - 1);
    } else {
      setCurrentIdx(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (processRef.current) {
      const width = processRef.current.offsetWidth;
      const left = `calc(50% - ${width / 2}px)`;
      processRef.current.style.left = left;
    }
  }, []);
  return (
    <StyleImageContainer>
      <StyleHouseImageBox imageLength={imageList.length}>
        {imageList.map((image, index) => (
          <StyleList currentIdx={currentIdx} key={index}>
            <StyleImage alt={`${index + 1}번째 이미지`} src={image} />
          </StyleList>
        ))}
      </StyleHouseImageBox>
      <StyleProcessContainer ref={processRef}>
        <StyleProcess currentIdx={currentIdx} imageLength={imageList.length}>
          {imageList.map((_, index) => (
            <StyleProcessList index={index} currentIdx={currentIdx} key={index}></StyleProcessList>
          ))}
        </StyleProcess>
      </StyleProcessContainer>
      <MdArrowBack
        onClick={() => {
          navigation(-1);
        }}
        style={{
          ...iconStyle,
          top: '20px',
          left: '20px',
        }}
        size={15}
      />
      <MdOutlineArrowBackIos
        onClick={prevImage}
        style={{
          ...iconStyle,
          bottom: '20px',
          left: '20px',
        }}
        size={15}
      />
      <MdOutlineArrowForwardIos
        onClick={nextImage}
        style={{
          ...iconStyle,
          bottom: '20px',
          right: '20px',
        }}
        size={15}
      />
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

const StyleHouseImageBox = styled.ul<{ imageLength: number }>`
  display: flex;
  flex-direction: row;
  width: ${props => `${props.imageLength * 100}%`};
  height: 100%;
  overflow: hidden;
`;

const StyleList = styled.li<{ currentIdx: number }>`
  list-style: none;
  width: 100%;
  transition: all 0.4s ease-in-out;
  transform: ${props => `translateX(-${props.currentIdx * 100}%)`};
`;

const StyleImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyleProcessContainer = styled.div`
  width: 55px;
  overflow: hidden;
  height: 10px;
  position: absolute;
  bottom: 30px;
`;

const StyleProcess = styled.ul<{ imageLength: number; currentIdx: number }>`
  /* 커렌트 인덱스가 2~length-3 */
  width: ${props => `${props.imageLength * 12 - 5}px`};
  display: flex;
  flex-direction: row;
  gap: 5px;
  transition: all 0.4s ease-in-out;
  transform: ${props =>
    `${
      props.currentIdx >= 2 &&
      props.currentIdx <= props.imageLength - 3 &&
      `translateX(-${(props.currentIdx - 2) * 12}px)`
    }`};
  transform: ${props =>
    `${props.currentIdx > props.imageLength - 3 && `translateX(-${(props.imageLength - 5) * 12}px)`}`};
`;

const StyleProcessList = styled.li<{ currentIdx: number; index: number }>`
  width: 7px;
  border: none;
  height: 7px;
  border-radius: 100%;
  background-color: ${props => (props.currentIdx === props.index ? 'white' : 'rgba(200, 200, 200, 0.7)')};
`;
