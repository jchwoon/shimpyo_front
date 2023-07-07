import styled from 'styled-components';

export default function GuestList() {
  return (
    <div>
      <StyleGuestListBox>
        <div>
          <span>성인</span>
          <span>만 12세 이상</span>
        </div>
        <div></div>
      </StyleGuestListBox>
    </div>
  );
}

const StyleGuestListBox = styled.div`
  margin: 1rem 0;
`;
