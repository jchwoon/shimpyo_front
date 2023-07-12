import CheckNonMemberMain from '../components/CheckNonMember/CheckNonMemberMain';
import Header from '../components/layout/Header';
import Logo from '../components/shared/Logo';

export default function CheckNonMember() {
  return (
    <>
      <Header>
        <Logo height="25" path="/" width="50" />
      </Header>
      <CheckNonMemberMain />
    </>
  );
}
