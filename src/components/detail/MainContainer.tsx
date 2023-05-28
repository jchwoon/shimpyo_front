import styled from 'styled-components';
import SideContainer from './SideContainer';
import SideBox from './SideBox';

export default function MainContainer() {
  return (
    <>
      <Main>
        <SideContainer />
        <SideBox />
      </Main>
    </>
  );
}

const Main = styled.div`
  display: flex;
  position: relative;
  height: 300px;
`;
