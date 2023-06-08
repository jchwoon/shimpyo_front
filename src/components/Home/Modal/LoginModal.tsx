import { useRecoilState } from 'recoil';
import Modal from '../../shared/Modal';
import { loginModalAtom } from '../../../recoil/atom';

export default function LoginModal() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(loginModalAtom);

  const body = <div>로그인</div>;
  return <Modal title="로그인" body={body} isOpen={isLoginModalOpen} />;
}
