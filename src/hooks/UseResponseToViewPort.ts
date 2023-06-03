import { useState, useEffect, useCallback } from 'react';

/**
 *
 * @returns {object} - viewPortWidth: 브라우저 창의 너비값
 */
export default function UseResponseToViewPort() {
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  const resizeHandler = useCallback(() => {
    setViewPortWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return { viewPortWidth };
}
