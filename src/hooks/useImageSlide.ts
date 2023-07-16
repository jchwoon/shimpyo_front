import { useEffect, useState } from 'react';

interface useImageSlideProps {
  imageList: string[];
  processRef: React.RefObject<HTMLDivElement>;
  optionalCurrentIdx?: number;
}

export default function useImageSlide({ imageList, processRef, optionalCurrentIdx }: useImageSlideProps) {
  const [currentIdx, setCurrentIdx] = useState(optionalCurrentIdx ? optionalCurrentIdx : 0);

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
  }, [processRef]);

  return { nextImage, prevImage, currentIdx };
}
