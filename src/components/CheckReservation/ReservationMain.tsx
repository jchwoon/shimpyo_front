import styled from 'styled-components';
import Main from '../layout/Main';
import Reservations from './ReservationCategory/Reservations';
import VisitedAccommodation from './ReservationCategory/VisitedAccommodation';
import ReservationCancel from './ReservationCategory/ReservationCancel';
import { useSearchParams } from 'react-router-dom';
import ReservationDetailModal from '../CheckReservationDetail/Modal/ReservationDetailModal';

export default function ReservationMain() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <Main>
        <StyleListBox>
          <StyleFlexBox>
            {searchParams.get('category') === 'reservation' && <Reservations />}
            {searchParams.get('category') === 'visited' && <VisitedAccommodation />}
            {searchParams.get('category') === 'cancel' && <ReservationCancel />}
          </StyleFlexBox>
        </StyleListBox>
      </Main>
      <ReservationDetailModal />
    </>
  );
}

const StyleListBox = styled.div`
  margin-top: 2rem;
  padding: 2rem 0;
`;

const StyleFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
