import { useEffect, useState } from 'react';
import CategoryTitle from '../../../ReUse/CategoryTitle';
import ReservationCategory from '../../../ReUse/ReservationCategory';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import useAuthorizedRequest from '../../../../../hooks/useAuthorizedRequest';
import usePagination from '../../../../../hooks/usePagination';
import CategoryPage from '../../../ReUse/CategoryPage';
import ReviewModal from '../../../Modal/ReviewModal';
import ReviewManageModal from '../../../Modal/ReviewManageModal';
import ReservationDetailModal from '../../../../CheckReservationDetail/Modal/ReservationDetailModal';
import GridItem from '../../../ReUse/GridItem';
import ReviewButton from './ReviewButton';

type State = 'COMPLETE' | 'USING' | 'FINISHED' | 'CANCEL';

export type ListType = {
  reservationId: number;
  houseImageUrl: string;
  houseName: string;
  houseOwnerName: string;
  houseType: string;
  checkInDate: string;
  checkOutDate: string;
  reservationStatus: State;
  existReview?: boolean;
};

interface IResultData {
  totalPage: number;
  totalElements: number;
  pageSize: number;
  list: ListType[];
}

export default function VisitedAccommodation() {
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentsArray, setContentsArray] = useState<ListType[]>([
    {
      checkInDate: '2023.06.19.09',
      checkOutDate: '2023.06.20.13',
      existReview: true,
      houseImageUrl: '/images/image.png',
      houseName: '파주 하늘펜션',
      houseOwnerName: '루비스',
      houseType: '펜션',
      reservationId: 15,
      reservationStatus: 'FINISHED',
    },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { changeClickedPage, changeNextPage, changePrevPage } = usePagination({
    category: 'visited',
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

  const getData = async () => {
    if (!currentPage) return;
    if (currentPage > totalPage || currentPage <= 0) return;

    await sendRequest({ url: `/user/reservations?page=${currentPage - 1}&reservationStatus=FINISHED` });
  };

  // useEffect(() => {
  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage]);

  const categoryTitle = (
    <StyleHeaderBox>
      <CategoryTitle title="이용 내역" />
      <span style={{ position: 'absolute', left: '130px', top: '18px' }}>{`(${totalItem})`}</span>
    </StyleHeaderBox>
  );

  const categoryList = (
    <StyleGridBox>
      {contentsArray.map(item => (
        <div key={item.reservationId}>
          <GridItem item={item} />
          <ReviewButton item={item} />
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

  return (
    <>
      <ReservationCategory categoryTitle={categoryTitle} categoryList={categoryList} page={page} />
      <ReviewModal getData={getData} />
      <ReviewManageModal getData={getData} />
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
