import { Theme, Components } from '@mui/material';

export default function Paper(theme: Theme) {
  const Paper: Components = {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: theme.spacing(4),
          borderRadius: theme.spacing(4),
          boxShadow: theme.customShadows[1]
        }
      },
    }
  };

  return Paper;
}
