import styled from 'styled-components';

export default function ImageContainer() {
  return (
    <ImageBox>
      <MainImageBox>
        <HoverDiv />
        <MainImage src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960" />
      </MainImageBox>
      <SideImageBox>
        <SideImagePiece marginBottom='10px'>
          <HoverDiv />
          <SideImage
            src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960"
          />
        </SideImagePiece>
        <SideImagePiece>
          <HoverDiv />
          <SideImage
            src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960"
          />
        </SideImagePiece>
      </SideImageBox>
      <SideImageBox>
        <SideImagePiece marginBottom='10px'>
          <HoverDiv />
          <SideImage
            src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960"
          />
        </SideImagePiece>
        <SideImagePiece>
          <HoverDiv />
          <SideImage
            src="https://a0.muscache.com/im/pictures/7ea9f758-6fd4-4b4c-9aa0-bcb3ed503d65.jpg?im_w=960"
          />
        </SideImagePiece>
      </SideImageBox>
    </ImageBox>
  );
}

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
`;

const MainImageBox = styled.div`
  width: 50%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
  position: relative;
  @media screen and (max-width: 900px){
    width: 100%;
  };
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverDiv = styled.div`
  z-index: 2;
  position: absolute;
  width:100%;
  height:100%;
  transition: 0.2s all ease;
  opacity:0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor:pointer;
  :hover{
    opacity:0.3;
  }
`

const SideImageBox = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: calc(25% - 10px);
  margin-left: 10px;
  @media screen and (max-width: 900px){
    display : none
  };
`;
interface ISideImagePiece {
  marginBottom?: string;
}

const SideImagePiece = styled.div<ISideImagePiece>`
  position: relative;
  margin-bottom: ${p => p.marginBottom ?? '0px'};

`
const SideImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
`;
