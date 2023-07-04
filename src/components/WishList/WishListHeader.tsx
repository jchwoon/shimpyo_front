import Header from '../layout/Header';
import Navbar from '../shared/Navbar/Navbar';

export default function WishListHeader() {
  const menuItems = <div>hi</div>;
  return (
    <Header>
      <Navbar logoPath="/" menuItems={menuItems}></Navbar>
    </Header>
  );
}
