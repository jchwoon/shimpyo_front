import { BottomNavigationAction } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NewMobileFooter from '../../shared/MobileFooter/NewMobileFooter';
import { useNavigate } from 'react-router-dom';
import { CustomIcon } from '../../shared/MobileFooter/CustomIcon';
import { HiPaperAirplane } from 'react-icons/hi';
import useResponseToViewPort from '../../../hooks/useResponseToViewPort';

export default function WishListFooter() {
  const navigation = useNavigate();
  const { viewPortWidth } = useResponseToViewPort();

  const homeNavi = <BottomNavigationAction icon={<CustomIcon />} label="홈" onClick={() => navigation('/')} />;

  const wishNavi = (
    <BottomNavigationAction icon={<FavoriteIcon />} label="관심 숙소" onClick={() => navigation('/wishlists')} />
  );

  const reservationNavi = (
    <BottomNavigationAction
      icon={<HiPaperAirplane size={25} />}
      label="예약 내역"
      onClick={() => navigation('/reservations?category=reservation')}
    />
  );

  const profileNavi = (
    <BottomNavigationAction icon={<AccountCircleIcon />} label="프로필" onClick={() => navigation('/users')} />
  );
  return (
    <div>
      {viewPortWidth <= 764 && (
        <NewMobileFooter
          defaultValue={0}
          Action0={homeNavi}
          Action1={wishNavi}
          Action2={reservationNavi}
          Action3={profileNavi}
        />
      )}
    </div>
  );
}
