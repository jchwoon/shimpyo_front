import styled from 'styled-components';

export default function ReservationHead() {
  return (
    <StyleReservationHead>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>예약</h2>
      <div style={{ alignSelf: 'flex-end', fontWeight: 'bold', textDecoration: 'underline' }}>{`모든 예약(0개)`}</div>
    </StyleReservationHead>
  );
}

const StyleReservationHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
`;
