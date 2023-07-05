import { useState, ReactElement, cloneElement } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import MobileNavbarTheme from '../../Main/OverrideTheme/MobileNavbarTheme';
import { Typography } from '@mui/material';

interface MobileFooterProps {
  defaultValue: number | null;
  Action0: ReactElement;
  Action1: ReactElement;
  Action2: ReactElement;
  Action3?: ReactElement;
}

export default function MobileFooter({ defaultValue, Action0, Action1, Action2, Action3 }: MobileFooterProps) {
  const [value, setValue] = useState(defaultValue);

  const setValueNullTimeout = () => {
    setTimeout(() => {
      setValue(defaultValue)
    }, 500) as NodeJS.Timeout;
  }

  const handleAction0Click = () => {
    setValue(0);
  };

  const handleAction1Click = () => {
    setValue(1);
  };

  const handleAction2Click = () => {
    setValue(2);
  };

  const handleAction3Click = () => {
    setValue(3);
  };

  const Action0WithClick = cloneElement(Action0, {
    onClick: (event: React.MouseEvent) => {
      if (Action0.props.onClick) {
        Action0.props.onClick(event);
      }
      handleAction0Click();
      setValueNullTimeout();
    },
    label: <Typography fontFamily='Noto Sans KR' fontWeight="500" fontSize="12px">{Action0.props.label} </Typography>
  });

  const Action1WithClick = cloneElement(Action1, {
    onClick: (event: React.MouseEvent) => {
      if (Action1.props.onClick) {
        Action1.props.onClick(event);
      }
      handleAction1Click();
      setValueNullTimeout();
    },
    label: <Typography fontFamily='Noto Sans KR' fontWeight="500" fontSize="12px">{Action1.props.label} </Typography>
  });

  const Action2WithClick = cloneElement(Action2, {
    onClick: (event: React.MouseEvent) => {
      if (Action2.props.onClick) {
        Action2.props.onClick(event);
      }
      handleAction2Click();
      setValueNullTimeout();
    },
    label: <Typography fontFamily='Noto Sans KR' fontWeight="500" fontSize="12px">{Action2.props.label} </Typography>
  });

  const Action3WithClick = Action3 ? cloneElement(Action3, {
    onClick: (event: React.MouseEvent) => {
      if (Action3.props.onClick) {
        Action3.props.onClick(event);
      }
      handleAction3Click();
      setValueNullTimeout();
    },
    label: <Typography fontFamily='Noto Sans KR' fontWeight="500" fontSize="12px">{Action2.props.label} </Typography>
  }) : null

  return (
    <>
      <Box sx={{ width: 500 }}>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <ThemeProvider theme={MobileNavbarTheme}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              {Action0WithClick}
              {Action1WithClick}
              {Action2WithClick}
              {Action3WithClick}
            </BottomNavigation>
          </ThemeProvider>
        </Paper>
      </Box>
    </>
  );
}