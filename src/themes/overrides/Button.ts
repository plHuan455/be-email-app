import { Theme, Components } from '@mui/material';

export default function Button(theme: Theme) {
  const Button: Components = {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(2),
        }
      }
    }
  };

  return Button;
}
