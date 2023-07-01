import ReservationCategory from '../ReservationCategory';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import usePagination from '../../../hooks/usePagination';
import CategoryFooter from '../CategoryFooter';

type ListType = {
  reservationId: number;
  houseImageUrl: string;
  houseName: string;
  houseOwnerName: string;
  houseType: string;
  checkInDate: string;
  checkOutDate: string;
  reservationStatus: string;
};

interface IResultData {
  totalPage: number;
  totalElements: number;
  pageSize: number;
  list: ListType[];
}

export default function Reservations() {
  const { responseData, sendRequest } = useAuthorizedRequest<IResultData>({});

  const [totalPage, setTotalPage] = useState<number>(3);
  const [totalItem, setTotalItem] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [contentsArray, setContentsArray] = useState<ListType[]>([
    {
      reservationId: 1,
      checkInDate: '2023.06.19.09',
      houseOwnerName: '정채운',
      houseType: '펜션',
      checkOutDate: '2023.06.19.09',
      houseImageUrl: '/images/image.png',
      reservationStatus: '예약확정',
      houseName: '럭셔리 호텔',
    },
  ]);
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
  }, [responseData, totalPage]);

  useEffect(() => {
    const getData = async () => {
      await sendRequest({ url: `/user/reservations?page=${currentPage}&reservationStatus=COMPLETE` });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const header = (
    <StyleHeaderBox>
      <HeaderContents title="예약 내역" />
      <span style={{ position: 'absolute', left: '130px', top: '18px' }}>{`(${totalItem})`}</span>
    </StyleHeaderBox>
  );
  const main = (
    <StyleGridBox>
      <GridContents contentsArray={contentsArray} />
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

  return <ReservationCategory header={header} main={main} footer={footer} />;
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
