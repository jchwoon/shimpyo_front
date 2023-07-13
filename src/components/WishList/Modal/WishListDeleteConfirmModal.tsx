import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { wishListDeleteConfirmModalAtom } from '../../../recoil/modalAtoms';
import Button from '../../shared/UI/Button';
import ColorButton from '../../shared/UI/ColorButton';
import { useEffect } from 'react';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { Item } from '../Main/WishListMain';

interface WishListDeleteConfirmModalProps {
  fetchWishListsData: () => void;
  item: Item;
}

export default function WishListDeleteConfirmModal({ fetchWishListsData, item }: WishListDeleteConfirmModalProps) {
  const [isWishListDeleteConfrimModal, setWishListDeleteConfrimModal] = useRecoilState(wishListDeleteConfirmModalAtom);
  const { responseData, sendRequest } = useAuthorizedRequest({});

  const deleteWishAccommodation = async (detailId: number) => {
    await sendRequest({ url: `/user/wish/${detailId}`, method: 'DELETE' });
  };

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      fetchWishListsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const body = <div>정말로 삭제하시겠어요?</div>;
  const footer = (
    <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
      <Button label="취소" onClick={() => setWishListDeleteConfrimModal(false)} />
      <ColorButton label="삭제하기" onClick={() => deleteWishAccommodation(item.houseId)} />
    </div>
  );
  return (
    <Modal
      label="관심 숙소 삭제하기"
      body={body}
      isOpen={isWishListDeleteConfrimModal}
      footer={footer}
      onClose={() => setWishListDeleteConfrimModal(false)}
    />
  );
}
