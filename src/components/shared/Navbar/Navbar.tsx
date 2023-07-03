import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';

import LogoButton from '../LogoButton/LogoButton';
import React from 'react';
import MenuBar from '../UserMenu/UserMenu';
import Container from '../Container';

const CustomizedAppBar = styled(AppBar) <{ appbarheight: string }>`
  background-color: #fff;

  height: ${({ appbarheight }) => appbarheight};
  position: absolute;
  transition: height 0.3s ease;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const CustomizedToolBar = styled(Toolbar)`
  height: 80px;
  justify-content: space-between;
`;

interface NavbarProps {
  children?: React.ReactNode;
  menuItems: React.ReactElement;
  logoPath: string;
  height?: string
}

export default function Navbar({ children, menuItems, logoPath, height }: NavbarProps) {
  return (
    <CustomizedAppBar elevation={0} appbarheight={height ? height : '80px'}>
      <Container>
        <CustomizedToolBar>
          <LogoButton path={logoPath} imageHeight={13} fontSize={'25px'} />
          {children}
          <MenuBar menuItems={menuItems} />
        </CustomizedToolBar>
      </Container>
    </CustomizedAppBar>
  );
}
