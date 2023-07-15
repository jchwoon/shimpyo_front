import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModalImageBox from './ModalImageBox';

interface ImageContainerProps {
  images: Array<string>
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: "none"
};

export default function ImageContainer1({ images }: ImageContainerProps) {

  const [open, setOpen] = useState(false);
  const [modalPicture, setModalPicture] = useState(0)

  const handleOpen = (value: number) => {
    setModalPicture(value)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const newImage = new Image()
  newImage.src = images[modalPicture]
  const originalWidth = newImage.naturalWidth;
  const originalHeight = newImage.naturalHeight;

  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <ImageBox>
        <MainImageBox>
          <MainHoverDiv onClick={() => handleOpen(0)} />
          <MainImage
            src={images[0]}
          />
        </MainImageBox>
        <SideImageBox>
          <SideImagePiece>
            <HoverDiv onClick={() => handleOpen(1)} />
            <SideImage
              src={images[1]}
            />
          </SideImagePiece>
          <div style={{ height: "5px", width: "100%" }} />
          <SideImagePiece>
            <HoverDiv onClick={() => handleOpen(2)} />
            <SideImage
              src={images[2]}
            />
          </SideImagePiece>
        </SideImageBox>
        <SideImageBox>
          <SideImagePiece>
            <HoverDiv
              style={{ borderRadius: "0 20px 0 0" }}
              onClick={() => handleOpen(3)}
            />
            <SideImage
              src={images[3]}
              style={{ borderRadius: "0 20px 0 0" }}
            />
          </SideImagePiece>
          <div style={{ height: "5px", width: "100%" }} />
          <SideImagePiece>
            <HoverDiv
              style={{ borderRadius: "0 0 20px 0" }}
              onClick={() => handleOpen(4)}
            />
            <SideImage
              src={images[4]}
              style={{ borderRadius: "0 0 20px 0" }}
            />
          </SideImagePiece>
        </SideImageBox>
      </ImageBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <ModalImageBox
            imageList={images}
            modalPicture={modalPicture}
            width={windowWidth * 0.8 > originalWidth ? originalWidth : windowWidth * 0.8}
            height={windowHeight * 0.9 > originalHeight ? originalHeight : windowHeight * 0.8} />
        </div>
      </Modal>
    </>
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

const MainHoverDiv = styled.div`
border-radius: 20px 0px 0px 20px;
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
@media screen and (max-width: 750px){
  border-radius: 20px 20px 20px 20px;
};
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

const ModalImage = styled.img`
  // width: 1080px;
  // height: 1080px;
  object-fit: cover;
`
