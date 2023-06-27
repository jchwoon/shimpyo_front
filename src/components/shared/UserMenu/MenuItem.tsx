import { MenuItem, Typography } from '@mui/material';

interface props {
  onClick: () => void;
  label: string;
}

export default function UserMenuItem({ onClick, label }: props) {
  return (
    <MenuItem onClick={onClick} disableRipple>
      <Typography fontFamily="Noto Sans KR" fontWeight="400">
        {label}
      </Typography>
    </MenuItem>
  );
}
