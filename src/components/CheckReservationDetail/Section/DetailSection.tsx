import styled from 'styled-components';
import Section from '../ReUse/Section';
import SectionListBox from '../ReUse/SectionListBox';
import SectionMenuListBox from '../ReUse/SectionMenuListBox';
import { FaUserFriends } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { guestManageModalAtom, reservationCancelModalAtom } from '../../../recoil/modalAtoms';
import { isOverCheckInAtom } from '../../../recoil/reservationAtom';
import { useParams, useSearchParams } from 'react-router-dom';

interface DetailSectionProps {
  peopleCount: number;
  isOver?: boolean;
}

export default function DetailSection({ peopleCount, isOver }: DetailSectionProps) {
  const { reservationId } = useParams();
  const [searchParams] = useSearchParams();
  const setGuestManageModal = useSetRecoilState(guestManageModalAtom);
  const setReservationCancelModal = useSetRecoilState(reservationCancelModalAtom);
  const isOverCheckIn = useRecoilValue(isOverCheckInAtom);

  return (
    <Section title="예약 세부정보">
      <SectionListBox title="게스트" content={`게스트 ${peopleCount}명`} />
      <StyleLine />
      <SectionListBox title="예약번호" content={reservationId || searchParams.get('reservationId')} />
      <StyleLine />
      <SectionListBox
        title="환불정책"
        content={
          <ol style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>1. 체크인 기준 1일 전까지 100% 환불 가능합니다.</li>
            <li>2. 체크인 기준 1일 전부터는 90% 환불 가능합니다.</li>
            <li>3. 입실 시간 초과 시 환불 불가능합니다.</li>
            <li>4. 숙소 사정에 의한 취소 시 100% 환불 가능합니다.</li>
          </ol>
        }
      />
      {!isOver && (
        <>
          <StyleLine />
          <SectionMenuListBox
            disable={isOverCheckIn}
            onClick={() => {
              if (isOverCheckIn) {
                return;
              }
              setGuestManageModal(true);
            }}
            icon={FaUserFriends}
            content="게스트 관리하기"
          />
          <StyleLine />
          <SectionMenuListBox
            disable={isOverCheckIn}
            onClick={() => {
              if (isOverCheckIn) {
                return;
              }
              setReservationCancelModal(true);
            }}
            icon={TiCancel}
            content="예약 취소"
          />
        </>
      )}
    </Section>
  );
}

const StyleLine = styled.div`
  height: 1px;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: rgb(200, 200, 200);
`;
