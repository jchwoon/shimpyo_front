import ReservationCategory from '../../ReUse/ReservationCategory';
import CategoryTitle from '../../ReUse/CategoryTitle';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import useAuthorizedRequest from '../../../../hooks/useAuthorizedRequest';
import usePagination from '../../../../hooks/usePagination';
import CategoryPage from '../../ReUse/CategoryPage';
import GridItem from '../../ReUse/GridItem';
import { ListType } from './VisitedAccommodation/VisitedAccommodation';

interface IResultData {
  totalPage: number;
  totalElements: number;
  pageSize: number;
  list: ListType[];
}

export default function Reservations() {
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});

  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentsArray, setContentsArray] = useState<ListType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { changeClickedPage, changeNextPage, changePrevPage } = usePagination({
    category: 'reservation',
    currentPage,
    searchParams,
    setCurrentPage,
    setSearchParams,
    totalPage,
  });

  useEffect(() => {
    if (!responseData) return;

    if (responseData?.isSuccess) {
      setContentsArray(responseData.result.list);
      setTotalPage(responseData.result.totalPage);
      setTotalItem(responseData.result.totalElements);
    }
  }, [responseData]);

  useEffect(() => {
    const getData = async () => {
      if (!currentPage) return;
      if (currentPage > totalPage || currentPage <= 0) return;

      await sendRequest({ url: `/user/reservations?reservationStatus=COMPLETE&page=${currentPage - 1}` });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const categoryTitle = (
    <StyleHeaderBox>
      <CategoryTitle title="예약 내역" />
      <span style={{ position: 'absolute', left: '130px', top: '18px' }}>{`(${totalItem})`}</span>
    </StyleHeaderBox>
  );
  const categoryList = (
    <StyleGridBox>
      {contentsArray.map(item => (
        <GridItem key={item.reservationId} item={item} />
      ))}
    </StyleGridBox>
  );

  const page = (
    <CategoryPage
      changeClickedPage={changeClickedPage}
      changeNextPage={changeNextPage}
      changePrevPage={changePrevPage}
      currentPage={currentPage}
      totalPage={totalPage}
    />
  );

  return <ReservationCategory categoryTitle={categoryTitle} categoryList={categoryList} page={page} />;
}

const StyleGridBox = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;

  justify-content: space-evenly;

  @media only screen and (min-width: 628px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 928px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (min-width: 1228px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StyleHeaderBox = styled.div`
  position: relative;
`;
