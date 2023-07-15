import styled from 'styled-components';

interface ImageSlideProps {
  imageList: string[];
  currentIdx: number;
  processRef: React.RefObject<HTMLDivElement>;
}

export default function ImageSlide({ imageList, currentIdx, processRef }: ImageSlideProps) {
  return (
    <>
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
    </>
  );
}

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
  object-fit: cover;
`;

const StyleProcessContainer = styled.div`
  width: 55px;
  overflow: hidden;
  height: 10px;
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: center;
`;

const StyleProcess = styled.ul<{ imageLength: number; currentIdx: number }>`
  /* 커렌트 인덱스가 2~length-3 */
  width: ${props => `${props.imageLength * 12 - 5}px`};
  display: flex;
  flex-direction: row;
  gap: 5px;
  transition: all 0.4s ease-in-out;
  transform: ${props =>
    `${props.currentIdx >= 2 &&
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
