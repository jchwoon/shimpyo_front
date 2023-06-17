import AdditionalInfoModal from '../components/Home/Modal/AdditionalInfoModal';
import JoinModal from '../components/Home/Modal/JoinModal';
import LoginModal from '../components/Home/Modal/LoginModal';
import IdFindModal from '../components/Home/Modal/IdFindModal';
import PasswordFindModal from '../components/Home/Modal/PasswordFindModal';

export default function Home() {
  return (
    <>
      hi
      <LoginModal />
      <JoinModal />
      <AdditionalInfoModal />
      <IdFindModal />
      <PasswordFindModal />
    </>
  );
}
