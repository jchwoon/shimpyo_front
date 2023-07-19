import ReservationCategory from '../../ReUse/ReservationCategory';
import CategoryTitle from '../../ReUse/CategoryTitle';
import { MouseEvent, useEffect, useState } from 'react';
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
  const { responseData: hardChangeResponse, sendRequest: hardChangeRequest } = useAuthorizedRequest({});
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

  const hardChangeTocompleteStatusforTest = async (e: MouseEvent, reservationId: number) => {
    e.stopPropagation();
    await hardChangeRequest({ url: `/user/reservations/${reservationId}/status`, method: 'PATCH' });
  };

  const getData = async () => {
    if (!currentPage) return;
    if (currentPage > totalPage || currentPage <= 0) return;

    await sendRequest({ url: `/user/reservations?reservationStatus=COMPLETE&page=${currentPage - 1}` });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData?.isSuccess) {
      setContentsArray(responseData.result.list);
      setTotalPage(responseData.result.totalPage);
      setTotalItem(responseData.result.totalElements);
    }
  }, [responseData]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!hardChangeResponse) return;

    if (hardChangeResponse.isSuccess) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hardChangeResponse]);

  const categoryTitle = (
    <StyleHeaderBox>
      <CategoryTitle title="예약 내역" />
      <span style={{ position: 'absolute', left: '130px', top: '18px' }}>{`(${totalItem})`}</span>
    </StyleHeaderBox>
  );
  const categoryList = (
    <StyleGridBox>
      {contentsArray.map(item => (
        <div key={item.reservationId} style={{ position: 'relative' }}>
          <GridItem item={item} />
          <StyleTestButton onClick={(e: MouseEvent) => hardChangeTocompleteStatusforTest(e, item.reservationId)}>
            이용 완료 처리
          </StyleTestButton>
        </div>
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

const StyleTestButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #e7220c;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  color: white;
`;
