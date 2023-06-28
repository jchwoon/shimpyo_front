import styled from 'styled-components';

export default function ImageContainer() {
  return (
    <ImageBox>
      <MainImageBox>
        <HoverDiv
          style={{ borderRadius: "20px 0 0 20px" }}
        />
        <MainImage
          src="https://source.unsplash.com/random?wallpapers"
        // style={{ borderRadius: "20px 0 0 20px" }}
        />
      </MainImageBox>
      <SideImageBox>
        <SideImagePiece>
          <HoverDiv />
          <SideImage
            src="https://source.unsplash.com/random?wallpapers"
          />
        </SideImagePiece>
        <div style={{ height: "5px", width: "100%" }} />
        <SideImagePiece>
          <HoverDiv />
          <SideImage
            src="https://source.unsplash.com/random?wallpapers"
          />
        </SideImagePiece>
      </SideImageBox>
      <SideImageBox>
        <SideImagePiece>
          <HoverDiv
            style={{ borderRadius: "0 20px 0 0" }}
          />
          <SideImage
            src="https://source.unsplash.com/random?wallpapers"
            style={{ borderRadius: "0 20px 0 0" }}
          />
        </SideImagePiece>
        <div style={{ height: "5px", width: "100%" }} />
        <SideImagePiece>
          <HoverDiv
            style={{ borderRadius: "0 0 20px 0" }}
          />
          <SideImage
            src="https://source.unsplash.com/random?wallpapers"
            style={{ borderRadius: "0 0 20px 0" }}
          />
        </SideImagePiece>
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
  @media screen and (max-width: 750px){
    width: 100%;
  };
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  @media screen and (max-width: 750px){
    border-radius: 20px 20px 20px 20px;
  };
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
  width: 25%;
  height: 100%;
  margin-left: 10px;
  @media screen and (max-width: 750px){
    display : none
  };
`;

const SideImagePiece = styled.div`
height: calc(50% - 5px);
width: 100%;
  position: relative;

`
const SideImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
`;
