import styled from 'styled-components';

export default function ReservationCategoryMenu() {
  return (
    <StyleRowMenuBarBox>
      <StyleRowMenuBar>
        <StyleMenuItem>체크아웃예정(0개)</StyleMenuItem>
        <StyleMenuItem>체크아웃예정(0개)</StyleMenuItem>
        <StyleMenuItem>체크아웃예정(0개)</StyleMenuItem>
        <StyleMenuItem>체크아웃예정(0개)</StyleMenuItem>
        <StyleMenuItem>체크아웃예정(0개)</StyleMenuItem>
      </StyleRowMenuBar>
    </StyleRowMenuBarBox>
  );
}

const StyleRowMenuBarBox = styled.div`
  display: absolute;
  padding: 1rem 0 1.5rem 0;
`;

const StyleRowMenuBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    width: 0.1rem;
  }
`;
const StyleMenuItem = styled.div`
  padding: 0.75rem;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 2rem;
`;
