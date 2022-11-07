// material-ui
import { alpha, createTheme, Theme, ThemeOptions } from '@mui/material/styles';

export const ThemeColors = {
  grey: {
    5: '#8F8DA0',
  },
  purple: {
    5: 'rgba(152, 34, 244, 0.42)',
  },
};

const Palette = (mode: Theme['palette']['mode']) => {
  const theme: ThemeOptions = {
    palette: {
      mode,
      common: {
        black: '#0d0d0d',
        white: '#fff',
      },
      primary: {
        main: '#9822F4',
      },
      secondary: {
        main: alpha('#9822F4', 0.42),
      },
      success: {
        main: '#5BBF88',
      },
      background: {
        paper: '#fff',
        secondary: '#fff',
        default: '#F7F7FC',
      },
      color: ThemeColors,
    },
  };

  return createTheme(theme);
};

export default Palette;
