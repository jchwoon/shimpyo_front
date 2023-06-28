
import { CustomizedLoginButton, CustomizedMenuIcon, CustomizedAccountCircleIcon } from './UserMenu.style';


export default function CustomizedMenus() {

  return (
    <div>
      <CustomizedLoginButton
        variant="contained"
        id="demo-customized-button"
        disableRipple
      >
        <CustomizedMenuIcon />
        <CustomizedAccountCircleIcon sx={{ height: 35, width: 35 }} />
      </CustomizedLoginButton>
    </div>
  );
}
