import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { wishListDeleteConfirmModalAtom } from '../../../recoil/modalAtoms';

export default function WishListDeleteConfirmModal() {
  const [isWishListDeleteConfrimModal, setWishListDeleteConfrimModal] = useRecoilState(wishListDeleteConfirmModalAtom);
  const body = <div>ghi</div>;
  return (
    <Modal body={body} isOpen={isWishListDeleteConfrimModal} onClose={() => setWishListDeleteConfrimModal(false)} />
  );
}
