import UseResponseToViewPort from '../../hooks/UseResponseToViewPort';
import Footer from '../layout/Footer';
import CommonFooter from '../shared/CommonFooter';

export default function HostingFooter() {
  const { viewPortWidth } = UseResponseToViewPort();
  return <Footer>{viewPortWidth > 770 ? <CommonFooter /> : <CommonFooter />}</Footer>;
}
