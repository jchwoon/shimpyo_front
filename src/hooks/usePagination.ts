import { MouseEvent, useEffect } from 'react';
import { SetStateAction } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

type SetFunction<T> = (value: SetStateAction<T>) => void;

interface usePaginationProps {
  currentPage: number;
  setCurrentPage: SetFunction<number>;
  category: string;
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

export default function usePagination({
  searchParams,
  currentPage,
  setCurrentPage,
  category,
  setSearchParams,
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
    const getPage = searchParams.get(`${category}Page`);
    setCurrentPage(Number(getPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!currentPage) return;

    setSearchParams(searchParams => {
      searchParams.set(`${category}Page`, `${currentPage}`);
      return searchParams;
    });
  }, [currentPage, setSearchParams, category]);

  return { changeClickedPage, changePrevPage, changeNextPage };
}
