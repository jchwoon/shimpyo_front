import styled from 'styled-components';
import { ListType } from '../Main/Category/VisitedAccommodation/VisitedAccommodation';
import { BsDot } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { reservationDetailModalAtom } from '../../../recoil/modalAtoms';
import { changeDateType, formatDate } from '../../../utils/changeFormat';

type ReservationState = 'COMPLETE' | 'USING' | 'FINISHED' | 'CANCEL';

interface GridItemProps {
  item: ListType;
}

function getStateMessage(state: ReservationState): string {
  switch (state) {
    case 'COMPLETE':
      return '예약완료';
    case 'USING':
      return '이용중';
    case 'FINISHED':
      return '이용완료';
    case 'CANCEL':
      return '취소됨';
    default:
      return '';
  }
}

export default function GridItem({ item }: GridItemProps) {
  const [, setSearchParams] = useSearchParams();
  const setReservationDetailModal = useSetRecoilState(reservationDetailModalAtom);
  const navigation = useNavigate();

  const showDetailReservation = (reservationId: number, state: ReservationState) => {
    if (state === 'COMPLETE' || state === 'USING') {
      navigation(`detail/${reservationId}`);
    } else {
      setSearchParams(searchParams => {
        searchParams.set('reservationId', String(reservationId));
        return searchParams;
      });
      setReservationDetailModal(true);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StyleGridItem onClick={() => showDetailReservation(item.reservationId, item.reservationStatus)}>
        <StyleAccommodation
          loading="lazy"
          src={`${item.houseImageUrl ? item.houseImageUrl : '/images/image.png'}`}
          alt={item.houseName}
        />
        <StyleContent>
          {item.reservationStatus && (
            <StyleReservationStatus>
              <span>{getStateMessage(item.reservationStatus)}</span>
            </StyleReservationStatus>
          )}
          <div style={{ position: 'relative' }}>
            <h3>{item.houseName}</h3>
            <BsDot style={{ position: 'absolute', right: '-28px', top: '-2px' }} size={25} />
            <span style={{ position: 'absolute', right: '-58px', top: '2px' }}>{item.houseType}</span>
          </div>
          <div>
            <span>{`${formatDate(changeDateType(item.checkInDate))}`}</span>
            <span style={{ rotate: '90deg' }}>~</span>
            <span>{`${formatDate(changeDateType(item.checkOutDate))}`}</span>
          </div>
        </StyleContent>
      </StyleGridItem>
    </div>
  );
}

const StyleGridItem = styled.div`
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgb(220, 220, 220);
  overflow: hidden;
  background-color: white;
  height: 330px;

  display: flex;
  flex-direction: column;
  box-shadow: 4px 6px 4px -1px rgb(0 0 0 / 0.1), 4px 6px 4px -2px rgb(0 0 0 / 0.1);
`;

const StyleAccommodation = styled.img`
  height: 55%;
  object-fit: cover;
  object-position: center;
`;

const StyleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  height: 100%;
  font-family: Noto Sans KR;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    font-weight: bold;
    font-size: 18px;
  }
`;

const StyleReservationStatus = styled.div`
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 15px;
  color: white;
  background-color: #009ca6;
`;
