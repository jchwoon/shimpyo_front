import styled from 'styled-components';
import Main from '../layout/Main';
import { useEffect, useState } from 'react';

import ImageBox from './ImageBox';
import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';
import WishListDeleteConfirmModal from './Modal/WishListDeleteConfirmModal';

type Item = {
  id: number;
  detailId: number;
  mainImage: string;
};

interface wishListData {
  list: Item[];
}

export default function WishListMain() {
  const { responseData, sendRequest } = useAuthorizedRequest<wishListData>({});

  const [wishList, setWishList] = useState([
    { id: 1, mainImage: '/images/image.png', detailId: 1 },
    { id: 2, mainImage: '/images/image.png', detailId: 2 },
    { id: 3, mainImage: '/images/image.png', detailId: 3 },
    { id: 4, mainImage: '/images/image.png', detailId: 4 },
  ]);

  const fetchWishListsData = async () => {
    await sendRequest({ url: '/wishlists' });
  };

  useEffect(() => {
    fetchWishListsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setWishList(responseData.result.list);
    }
  }, [responseData]);
  return (
    <>
      <Main>
        <StyleTitle>관심 숙소</StyleTitle>
        <StyleGridBox>
          {wishList.map(item => (
            <ImageBox key={item.id} fetchWishListsData={fetchWishListsData} item={item} />
          ))}
        </StyleGridBox>
      </Main>
      <WishListDeleteConfirmModal />
    </>
  );
}

const StyleTitle = styled.h1`
  margin-top: 100px;
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: bold;
`;

const StyleGridBox = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 644px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 1096px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
