import styled from 'styled-components';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';
import { useRef } from 'react';
import useImageSlide from '../../../hooks/useImageSlide';
import ImageSlide from '../../shared/ImageSlide';

interface ImageBoxProps {
    imageList: string[];
    modalPicture: number;
    width: number;
    height: number;
}

export default function ModalImageBox({ imageList, modalPicture, width, height }: ImageBoxProps) {
    const processRef = useRef<HTMLDivElement>(null);
    const { nextImage, prevImage, currentIdx } = useImageSlide({ imageList, processRef, optionalCurrentIdx: modalPicture });

    return (
        <StyleImageContainer style={{ width, height }}>
            <ImageSlide currentIdx={currentIdx} imageList={imageList} processRef={processRef} />
            <MdOutlineArrowBackIos
                onClick={prevImage}
                style={{
                    ...iconStyle,
                    bottom: '20px',
                    left: '20px',
                }}
                size={30}
            />
            <MdOutlineArrowForwardIos
                onClick={nextImage}
                style={{
                    ...iconStyle,
                    bottom: '20px',
                    right: '20px',
                }}
                size={30}
            />
        </StyleImageContainer>
    );
}
const iconStyle = {
    position: 'absolute' as const,
    backgroundColor: 'white',
    borderRadius: '100%',
    padding: '0.5rem',
    cursor: 'pointer',
    boxShadow: '3px 3px 6px -1px rgb(0 0 0 / 0.3)',
};

const StyleImageContainer = styled.div`
    overflow: hidden;
    position: relative;
    `;
