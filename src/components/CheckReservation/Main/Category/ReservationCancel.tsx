import { useEffect, useState } from 'react';
import CategoryTitle from '../../ReUse/CategoryTitle';
import ReservationCategory from '../../ReUse/ReservationCategory';
import styled from 'styled-components';
import useAuthorizedRequest from '../../../../hooks/useAuthorizedRequest';
import { useSearchParams } from 'react-router-dom';
import CategoryPage from '../../ReUse/CategoryPage';
import usePagination from '../../../../hooks/usePagination';
import ReservationDetailModal from '../../../CheckReservationDetail/Modal/ReservationDetailModal';
import { ListType } from './VisitedAccommodation/VisitedAccommodation';
import GridItem from '../../ReUse/GridItem';

interface IResultData {
  totalPage: number;
  totalElements: number;
  pageSize: number;
  list: ListType[];
}

export default function ReservationCancel() {
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentsArray, setContentsArray] = useState<ListType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { changeClickedPage, changeNextPage, changePrevPage } = usePagination({
    category: 'reservationCancel',
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
      await sendRequest({ url: `/user/reservations?page=${currentPage - 1}&reservationStatus=CANCEL` });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  const categoryTitle = (
    <StyleHeaderBox>
      <CategoryTitle title="취소 내역" />
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

  return (
    <>
      <ReservationCategory categoryTitle={categoryTitle} categoryList={categoryList} page={page} />
      <ReservationDetailModal />
    </>
  );
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
