import styled from 'styled-components';
import Section from '../ReUse/Section';
import SectionListBox from '../ReUse/SectionListBox';
import SectionMenuListBox from '../ReUse/SectionMenuListBox';
import { FaUserFriends } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';

interface DetailSectionProps {
  peopleCount: string;
  reservationNumber: number;
}

export default function DetailSection({ peopleCount, reservationNumber }: DetailSectionProps) {
  return (
    <Section title="예약 세부정보">
      <SectionListBox title="게스트" content={`게스트 ${peopleCount}명`} />
      <StyleLine />
      <SectionListBox title="예약번호" content={reservationNumber} />
      <StyleLine />
      <SectionListBox
        title="환불정책"
        content={
          <ol>
            <li>1. 당일 예약 건 입실 시간 전에 한에서만 90% 환불</li>
            <li>2. 당일 예약 건 아닐 경우 100% 환불 가능</li>
            <li>3. 입실 시간 초과 시 환불 불가능</li>
          </ol>
        }
      />
      <StyleLine />
      <SectionMenuListBox icon={FaUserFriends} content="게스트 관리하기" />
      <StyleLine />
      <SectionMenuListBox icon={TiCancel} content="예약 취소" />
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
