import styled from 'styled-components';
import ReservationHead from './ReservationHead';
import ReservationCategoryMenu from './ReservationCategoryMenu';
import ReservationBody from './ReservationBody';

export default function Reservation() {
  return (
    <StyleReservationBox>
      <ReservationHead />
      <ReservationCategoryMenu />
      <ReservationBody />
    </StyleReservationBox>
  );
}

const StyleReservationBox = styled.div`
  margin-top: 5rem;
`;
