import Main from '../layout/Main';
import Info from './Info/Info';
import Reservation from './Reservation/Reservation';
import Welcome from './Welcome';

export default function HostingMain() {
  return (
    <Main>
      <Welcome />
      <Info />
      <Reservation />
    </Main>
  );
}
