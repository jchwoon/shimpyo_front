import { useEffect, useState } from 'react';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import ReservationCategory from '../ReservationCategory';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import usePagination from '../../../hooks/usePagination';
import CategoryFooter from '../CategoryFooter';
import ReviewModal from '../Modal/ReviewModal';
import ReviewManageModal from '../Modal/ReviewManageModal';
import ReservationDetailModal from '../../CheckReservationDetail/Modal/ReservationDetailModal';

type State = 'COMPLETE' | 'USING' | 'FINISHED' | 'CANCEL';

type ListType = {
  reservationId: number;
  houseImageUrl: string;
  houseName: string;
  houseOwnerName: string;
  houseType: string;
  checkInDate: string;
  checkOutDate: string;
  reservationStatus: State;
  existReview: boolean;
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
  const [contentsArray, setContentsArray] = useState<ListType[]>([]);
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const header = (
    <StyleHeaderBox>
      <HeaderContents title="이용 내역" />
      <span style={{ position: 'absolute', left: '130px', top: '18px' }}>{`(${totalItem})`}</span>
    </StyleHeaderBox>
  );

  const main = (
    <StyleGridBox>
      <GridContents visited contentsArray={contentsArray} />
    </StyleGridBox>
  );

  const footer = (
    <CategoryFooter
      changeClickedPage={changeClickedPage}
      changeNextPage={changeNextPage}
      changePrevPage={changePrevPage}
      currentPage={currentPage}
      totalPage={totalPage}
    />
  );

  return (
    <>
      <ReservationCategory header={header} main={main} footer={footer} />
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
