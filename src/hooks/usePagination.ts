import { MouseEvent, useEffect } from 'react';
import { SetStateAction } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

type SetFunction<T> = (value: SetStateAction<T>) => void;

interface usePaginationProps {
  currentPage: number;
  setCurrentPage: SetFunction<number>;
  category: string;
  totalPage: number;
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

export default function usePagination({
  searchParams,
  currentPage,
  setCurrentPage,
  category,
  setSearchParams,
  totalPage,
}: usePaginationProps) {
  const changeClickedPage = (e: MouseEvent<HTMLSpanElement>) => {
    const clickedPage = e.currentTarget.textContent;

    setCurrentPage(Number(clickedPage));
  };

  const changePrevPage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const changeNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  useEffect(() => {
    const getPage = searchParams.get(`page`);
    const changeNumber = Number(getPage);

    if (changeNumber >= totalPage) {
      setCurrentPage(totalPage);
    } else if (changeNumber >= 1 && changeNumber <= totalPage) {
      setCurrentPage(changeNumber);
    } else {
      setCurrentPage(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('page')]);

  useEffect(() => {
    if (!currentPage) return;

    setSearchParams(searchParams => {
      searchParams.set(`page`, `${currentPage}`);
      return searchParams;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, category]);

  return { changeClickedPage, changePrevPage, changeNextPage };
}
