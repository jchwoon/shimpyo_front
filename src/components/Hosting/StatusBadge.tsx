import styled from 'styled-components';
import { STATUS } from '../../constants/accommodation';

interface StatusBadgeProps {
  status: 'COMPLETE' | 'USING' | 'FINISHED';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <StyledBadgeContainer status={status}>{STATUS[status]}</StyledBadgeContainer>;
}

const StyledBadgeContainer = styled.div<StatusBadgeProps>`
  border: 1px solid black;
  width: 75px;
  text-align: center;
  margin: 0 auto;
  padding: 4px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);

  ${({ status }) => {
    if (status === 'USING') {
      return `
        background-color: #009ca6;
        color: white;
      `;
    } else if (status === 'COMPLETE') {
      return `
        width: 75px;
        background-color: white;
        color: #212121;
      `;
    } else if (status === 'FINISHED') {
      return `
        width: 75px;
        background-color: #212121;
        color: white;
      `;
    }
  }}
`;
