import styled from 'styled-components';
import SideContainer from './SideContainer';
import SideBox from '../sideBox/SideBox';
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
  @media screen and (max-width: 900px){
    flex-direction: column;
  };
`;
