import { BsHouseCheck } from 'react-icons/bs';
import styled from 'styled-components';

export default function ReservationBody() {
  return (
    <StyleReservationBoard>
      <StyleBoardContent>
        <BsHouseCheck style={{ marginBottom: '2rem' }} size={30} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>현재 숙박중인</span>
          <span>게스트가 없습니다.</span>
        </div>
      </StyleBoardContent>
    </StyleReservationBoard>
  );
}

const StyleReservationBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: whitesmoke;
  height: 30vh;
  border-radius: 1rem;
  margin-bottom: 5rem;
`;

const StyleBoardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
