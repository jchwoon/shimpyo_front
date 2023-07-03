import { useEffect, useState } from 'react';
import GridContents from '../GridContents';
import HeaderContents from '../HeaderContents';
import ReservationCategory from '../ReservationCategory';
import styled from 'styled-components';
import useReservationCategoryToggle from '../../../hooks/useReservationCategoryToggle';
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
  reservationStatus?: string;
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
  const { isOpen, toggleShowButton } = useReservationCategoryToggle('visited');

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
      existReview: true,
      houseName: '럭셔리 호텔',
    },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { changeClickedPage, changeNextPage, changePrevPage } = usePagination({
    category: 'visited',
    currentPage,
    searchParams,
    setCurrentPage,
    setSearchParams,
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
      if (!currentPage) return;
      if (currentPage > totalPage || currentPage <= 0) return;
      await sendRequest({ url: `/user/reservations?page=${currentPage}` });
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const header = (
    <StyleHeaderBox>
      <HeaderContents
        isOpen={isOpen}
        onClick={() => {
          toggleShowButton();
        }}
        title="이용 내역"
      />
      <span style={{ position: 'absolute', left: '190px', top: '20px' }}>{`(${totalItem})`}</span>
    </StyleHeaderBox>
  );

  const main = (
    <>
      {isOpen && (
        <StyleGridBox>
          <GridContents visited contentsArray={contentsArray} />
        </StyleGridBox>
      )}
    </>
  );

  const footer = (
    <CategoryFooter
      changeClickedPage={changeClickedPage}
      changeNextPage={changeNextPage}
      changePrevPage={changePrevPage}
      currentPage={currentPage}
      isOpen={isOpen}
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
