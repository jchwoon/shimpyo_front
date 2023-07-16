import styled from 'styled-components';

export default function CheckMark() {
  return (
    <StyledContainer>
      <StyledSvc viewBox="0 0 24 24">
        <StyledPath d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />
      </StyledSvc>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: absolute;
`;
const StyledSvc = styled.svg`
  height: 30px;
  width: 30px;
`;

const StyledPath = styled.path`
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  fill: none;
  stroke: #e95309b2;
  stroke-width: 4;
  stroke-dasharray: 23;
  stroke-dashoffset: 23;
  animation: draw 500ms ease-in forwards;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
