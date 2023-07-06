import { MenuItem, Typography } from '@mui/material';


import { navbarMenuControl } from '../../../recoil/navBarAtoms';
import { useRecoilState } from "recoil";

interface props {
  onClick: () => void;
  label: string;
  bold?: boolean;
  divide?: boolean;
}


export default function UserMenuItem({ divide, onClick, label, bold }: props) {

  const [navbarMenu, setNavbarMenu] = useRecoilState(navbarMenuControl);
  const handleMenuItemClick = (): void => {
    onClick(); // UserMenuItem의 onClick prop 호출
    setNavbarMenu(null); // setNavbarMenu(null) 호출
  };


  return (
    <>
      <MenuItem
        // onClick={onClick}
        onClick={handleMenuItemClick}
        disableRipple>
        <Typography fontFamily="Noto Sans KR" fontWeight="400">
          <span style={{ fontWeight: `${bold && 'bold'}` }}>{label}</span>
        </Typography>
      </MenuItem>
      {divide && <div style={{ borderBottom: '1px solid rgb(220,220,220)' }}></div>}
    </>
  );
}
