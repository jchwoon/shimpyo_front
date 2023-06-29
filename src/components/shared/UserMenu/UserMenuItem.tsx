import { MenuItem, Typography } from '@mui/material';

interface props {
  onClick: () => void;
  label: string;
  bold?: boolean;
  divide?: boolean;
}

export default function UserMenuItem({ divide, onClick, label, bold }: props) {
  return (
    <>
      <MenuItem onClick={onClick} disableRipple>
        <Typography fontFamily="Noto Sans KR" fontWeight="400">
          <span style={{ fontWeight: `${bold && 'bold'}` }}>{label}</span>
        </Typography>
      </MenuItem>
      {divide && <div style={{ borderBottom: '1px solid rgb(220,220,220)' }}></div>}
    </>
  );
}
