// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

// import { Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const Typography = (
  fontFamily: TypographyOptions['fontFamily'],
): TypographyOptions => ({
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily,
    fontWeight: 500,
    fontSize: '2rem',
  },
  h2: {
    fontFamily,
    fontWeight: 500,
    fontSize: '1.75rem',
  },
  h3: {
    fontFamily,
    fontWeight: 500,
    fontSize: '1.625rem',
  },
  h4: {
    fontFamily,
    fontWeight: 500,
    fontSize: '1.5rem',
  },
  h5: {
    fontFamily,
    fontWeight: 500,
    fontSize: '1.375rem',
  },
  h6: {
    fontFamily,
    fontWeight: 500,
    fontSize: '1.25rem',
  },
  body1: {
    fontFamily,
    fontWeight: 400,
    fontSize: '1rem',
  },
  body2: {
    fontFamily,
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  subtitle1: {
    fontFamily,
    fontSize: '0.75rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontFamily,
    fontSize: '0.625rem',
    fontWeight: 400,
  },
  overline: {
    lineHeight: 1.66,
  },
  button: {
    fontSize: '0.875rem',
    textTransform: 'capitalize',
  },
});

export default Typography;
