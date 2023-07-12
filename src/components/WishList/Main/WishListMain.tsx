import styled from 'styled-components';
import Main from '../../layout/Main';
import { useEffect, useState } from 'react';

import ImageBox from './ImageBox';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';

export type Item = {
  houseId: number;
  houseName: string;
  type: string;
  houseImages: string;
};

export default function WishListMain() {
  const { responseData, sendRequest } = useAuthorizedRequest<Item[]>({});

  const [wishList, setWishList] = useState<Item[]>([]);

  const fetchWishListsData = async () => {
    await sendRequest({ url: '/user/wish' });
  };

  useEffect(() => {
    fetchWishListsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setWishList(responseData.result);
    }
  }, [responseData]);
  return (
    <>
      <Main>
        <StyleTitle>관심 숙소</StyleTitle>
        {wishList.length === 0 && (
          <StyleInfoMessage>
            <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>관심이 가는 숙소를 저장해보세요</h2>
            <span style={{ marginTop: '20px', display: 'block' }}>
              검색 중에 마음에 드는 숙소를 관심숙소에 저장하려면 하트 아이콘을 클릭하세요.
            </span>
          </StyleInfoMessage>
        )}
        <StyleGridBox>
          {wishList.map(item => (
            <ImageBox fetchWishListsData={fetchWishListsData} key={item.houseId} item={item} />
          ))}
        </StyleGridBox>
      </Main>
    </>
  );
}

const StyleTitle = styled.h1`
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;

  @media only screen and (min-width: 764px) {
    margin-top: 100px;
  }
`;

const StyleInfoMessage = styled.div``;

const StyleGridBox = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin-bottom: 80px;

  @media only screen and (min-width: 644px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 1096px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
