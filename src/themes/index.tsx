import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import React, { useMemo } from 'react';


import componentsOverride from './overrides';
import Palette from './palette';
import CustomShadows from './shadows';
import Typography from './typography';


interface MuiThemeCustomizationProps {
  children?: React.ReactNode;
}
const MuiThemeCustomization: React.FC<MuiThemeCustomizationProps> = ({
  children
}) => {
  const theme = Palette('light');

  const themeTypography = Typography('"Quicksand", sans-serif');
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1440,
          xl: 1920
        }
      },
      spacing: 4,
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 56,
          '@media (min-width:0px) and (orientation: landscape)': {
            minHeight: 48
          },
          '@media (min-width:600px)': {
            minHeight: 64
          }
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeCustomization;
