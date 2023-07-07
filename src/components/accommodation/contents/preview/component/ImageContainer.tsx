import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { imageListState } from '../../../../../recoil/accommodationAtoms';

interface ImageProps {
  index: number;
}

export default function ImageContainer() {
  const imageList = useRecoilValue(imageListState);

  return (
    <ImageBox>
      <MainImageBox>
        <MainImage src={imageList[0].image} />
      </MainImageBox>

      <SideImageBox>
        {imageList.map((image, idx) => {
          if (idx === 0 || !image.image) return null;
          return (
            <SideImagePiece key={`side ${idx}`}>
              <SideImage src={image.image} index={idx} />
            </SideImagePiece>
          );
        })}
      </SideImageBox>
    </ImageBox>
  );
}

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
`;

const MainImageBox = styled.div`
  width: 50%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
  position: relative;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  @media screen and (max-width: 750px) {
    border-radius: 20px;
  }
`;

const SideImageBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  flex-wrap: wrap;
  width: 25%;
  height: 100%;
  margin-left: 10px;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const SideImagePiece = styled.div`
  height: calc(50% - 5px);
  width: 100%;
  position: relative;
`;
const SideImage = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;

  ${({ index }) => {
    if (index === 3) {
      return `border-radius: 0 20px 0 0;`;
    }

    if (index === 4) {
      return `border-radius: 0 0 20px 0;`;
    }
  }}
`;
