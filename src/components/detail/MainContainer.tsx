import styled from 'styled-components';
import SideContainer from './SideContainer';
import SideBox from './SideBox';
import BottomContainer from './BottomContainer';

export default function MainContainer() {
  return (
    <>
      <Main>
        <SideContainer />
        <SideBox />
      </Main>
      <BottomContainer />
    </>
  );
}

const Main = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-top: 48px;
`;
