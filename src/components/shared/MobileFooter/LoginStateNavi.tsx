import { BottomNavigationAction } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NewMobileFooter from '../../shared/MobileFooter/NewMobileFooter';
import { useNavigate } from 'react-router-dom';
import { CustomIcon } from '../../shared/MobileFooter/CustomIcon';
import { HiPaperAirplane } from 'react-icons/hi';
import useResponseToViewPort from '../../../hooks/useResponseToViewPort';

export default function LoginStateNavi({ intersectionWidthValue, currentValue }: { intersectionWidthValue: number, currentValue?: number }) {
  const navigation = useNavigate();
  const { viewPortWidth } = useResponseToViewPort();

  const homeNavi = <BottomNavigationAction disableRipple icon={<CustomIcon />} label="홈" onClick={() => navigation('/')} />;

  const wishNavi = (
    <BottomNavigationAction disableRipple icon={<FavoriteIcon />} label="관심 숙소" onClick={() => navigation('/wishlists')} />
  );

  const reservationNavi = (
    <BottomNavigationAction
      disableRipple
      icon={<HiPaperAirplane size={25} />}
      label="예약 내역"
      onClick={() => navigation('/reservations?category=reservation')}
    />
  );

  const profileNavi = (
    <BottomNavigationAction disableRipple icon={<AccountCircleIcon />} label="계정" onClick={() => navigation('/account-settings')} />
  );

  console.log("currentValue:", currentValue)
  return (
    <div>
      {viewPortWidth <= intersectionWidthValue && (
        <NewMobileFooter
          defaultValue={currentValue !== undefined ? currentValue : null}
          Action0={homeNavi}
          Action1={wishNavi}
          Action2={reservationNavi}
          Action3={profileNavi}
        />
      )}
    </div>
  );
}
