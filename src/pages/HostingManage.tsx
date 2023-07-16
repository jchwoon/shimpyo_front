import styled from 'styled-components';
import HostingHeader from '../components/Hosting/HostingHeader';
import HostingManageMain from '../components/HostingManage/HostingManageMain';

export default function HostingManage() {
  return (
    <StyledContainer>
      <HostingHeader />
      <HostingManageMain />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
