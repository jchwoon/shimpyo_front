import { useEffect, useState, useCallback } from 'react';

interface UseMenuBarProps {
  initialState: boolean;
  menuRef: React.RefObject<any>;
  buttonRef: React.RefObject<any>;
}

/**
 * 메뉴 바를 관리하는 커스텀 훅입니다.
 * @param {boolean} initialState - 초기 메뉴 상태 (열림 또는 닫힘)
 * @param {React.RefObject} menuRef - 메뉴 요소의 참조
 * @param {React.RefObject} buttonRef - 버튼 요소의 참조
 * @returns {object} - isOpen: 메뉴 열림 여부를 나타내는 상태값
 */
export default function UseMenuBar({ initialState, menuRef, buttonRef }: UseMenuBarProps) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onClick = useCallback(
    (e: MouseEvent) => {
      const isMenuClicked = menuRef?.current?.contains(e.target);
      const isButtonClicked = buttonRef?.current?.contains(e.target);

      if (isButtonClicked && !isOpen) {
        setIsOpen(true);
      } else if (isOpen && !isMenuClicked) {
        setIsOpen(false);
      }
    },
    [buttonRef, menuRef, isOpen],
  );

  const onBlur = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('click', onClick);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('blur', onBlur);
    };
  }, [buttonRef, menuRef, isOpen, onClick, onBlur]);

  return { isOpen };
}
