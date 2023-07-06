import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useAuthorizedRequest from '../../hooks/useAuthorizedRequest';
import { MouseEvent, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { wishListDeleteConfirmModalAtom } from '../../recoil/modalAtoms';

type Item = {
  id: number;
  detailId: number;
  mainImage: string;
};

interface ImageBoxProps {
  item: Item;
  fetchWishListsData: () => void;
}

const StyleCloseIcon = {
  position: 'absolute' as const,
  top: '15px',
  right: '15px',
  backgroundColor: 'white',
  padding: '0.5rem',
  borderRadius: '100%',
  boxShadow: '3px 3px 6px -1px rgb(0 0 0 / 0.3)',
};

export default function ImageBox({ item, fetchWishListsData }: ImageBoxProps) {
  const navigation = useNavigate();
  const { responseData, sendRequest } = useAuthorizedRequest({});
  const setWishListDeleteConfirmModal = useSetRecoilState(wishListDeleteConfirmModalAtom);

  const showDeleteComfirmModal = (e: MouseEvent, detailId: number) => {
    e.stopPropagation();
    setWishListDeleteConfirmModal(true);
    deleteWishAccommodation(detailId);
  };

  const deleteWishAccommodation = async (detailId: number) => {
    await sendRequest({ url: `/wishLists/${detailId}`, method: 'DELETE' });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      fetchWishListsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);
  return (
    <StyleImageBox
      onClick={() => {
        navigation(`/detail/${item.detailId}`);
      }}
      key={item.id}
    >
      <MainImage src={item.mainImage} />
      <MdClose
        onClick={(e: MouseEvent) => showDeleteComfirmModal(e, item.detailId)}
        style={{ ...StyleCloseIcon }}
        size={30}
      />
    </StyleImageBox>
  );
}

const StyleImageBox = styled.div`
  cursor: pointer;
  position: relative;
  height: 300px;
`;

const MainImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`;
