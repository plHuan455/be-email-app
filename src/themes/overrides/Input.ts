import { Theme, Components } from '@mui/material';

export default function Input(theme: Theme) {
  const Input: Components = {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.spacing(3)
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(2),
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            elevation: 5,
            sx: {
              padding: theme.spacing(3),
              borderRadius: theme.spacing(1),
              boxShadow: theme.customShadows[2]
            }
          }
        }
      }
    }
  };

  return Input;
}
