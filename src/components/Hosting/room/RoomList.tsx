import styled from 'styled-components';
import { RoomDataType } from '../HostingMain';
import RoomItem from './RoomItem';

interface RoomListProps {
  data: RoomDataType[];
}

export default function RoomList({ data }: RoomListProps) {
  return (
    <StyledRoomContainer>
      <StyledThead>
        <StyledTr>
          <th>객실이름</th>
          <th>사진</th>
          <th>상태</th>
          <th>예약자성함</th>
          <th>인원</th>
          <th>전화번호</th>
          <th>체크인시간</th>
          <th>체크아웃시간</th>
        </StyledTr>
      </StyledThead>

      {data.length < 1 ? (
        <tbody>
          <StyledBlankTr>
            <StyledBlankTd colSpan={8}>객실 예약 내역이 없습니다.</StyledBlankTd>
          </StyledBlankTr>
        </tbody>
      ) : (
        <tbody>
          {data.map((room, idx) => {
            return <RoomItem key={`room${idx}`} data={room} />;
          })}
        </tbody>
      )}
    </StyledRoomContainer>
  );
}

const StyledRoomContainer = styled.table`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  height: 350px;
  overflow-x: auto;
  background-color: rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;

const StyledThead = styled.thead`
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  background-color: rgba(0, 0, 0, 0.02);
  height: 70px;
`;

const StyledTr = styled.tr`
  display: grid;
  height: 100%;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1.5fr 1.5fr 1.5fr 1.5fr;
  justify-content: center;
  align-items: center;
  width: 1000px;
  overflow-x: auto;

  @media (min-width: 1000px) {
    width: 100%;
  }
`;

const StyledBlankTr = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;

  @media (min-width: 780px) {
    width: 100%;
  }
`;

const StyledBlankTd = styled.td`
  font-size: 20px;
`;
