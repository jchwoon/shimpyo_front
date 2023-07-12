import styled from 'styled-components';
import { RoomDataType } from './HostingMain';
import StatusBadge from './StatusBadge';

interface RoomItemProps {
  data: RoomDataType;
}

export default function RoomItem({ data }: RoomItemProps) {
  return (
    <StyledItemContainer>
      <StyledTd>{data.roomName}</StyledTd>
      <StyledTd>
        <StyledImg src={data.roomImageUrl} />
      </StyledTd>
      <StyledTd>
        <StatusBadge status={data.reservationStatus} />
      </StyledTd>
      <StyledTd>{data.personName}</StyledTd>
      <StyledTd>{data.peopleCount}</StyledTd>
      <StyledTd>{data.phoneNumber}</StyledTd>
      <StyledTd>{data.checkInDate}</StyledTd>
      <StyledTd>{data.checkOutDate}</StyledTd>
    </StyledItemContainer>
  );
}

const StyledItemContainer = styled.tr`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1.5fr 1.5fr 1.5fr 1.5fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);

  background-color: white;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledImg = styled.img`
  width: 100px;
  object-fit: contain;
`;

const StyledTd = styled.td`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
