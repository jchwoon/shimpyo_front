import styled from 'styled-components';
import Header from '../components/Navbar/Header';
import MotelManageMenu from '../components/Menu/MotelManageMenu';

export default function Hosting() {
  const centerContent = (
    <StyleHeaderMenuBox hidden>
      <MotelManageMenu />
    </StyleHeaderMenuBox>
  );
  return (
    <>
      <Header centerContent={centerContent} />
      {/* <StyleMain /> */}
    </>
  );
}

const StyleHeaderMenuBox = styled.div`
  position: relative;
  @media only screen and (min-width: 1024px) {
    display: block;
  }
`;

// const StyleMain = styled.main`
//   @media only screen and (min-wi)
// `;
