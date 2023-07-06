import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { wishListDeleteConfirmModalAtom } from '../../../recoil/modalAtoms';
import WishListDeleteConfirmModal from '../Modal/WishListDeleteConfirmModal';
import { Item } from './WishListMain';

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
  const [targetId, setTargetId] = useState<number>();
  const setWishListDeleteConfirmModal = useSetRecoilState(wishListDeleteConfirmModalAtom);

  const showDeleteComfirmModal = (e: MouseEvent, detailId: number) => {
    e.stopPropagation();
    setTargetId(detailId);
    setWishListDeleteConfirmModal(true);
  };
  return (
    <>
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
          size={20}
        />
      </StyleImageBox>
      {item.detailId === targetId && <WishListDeleteConfirmModal item={item} fetchWishListsData={fetchWishListsData} />}
    </>
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
