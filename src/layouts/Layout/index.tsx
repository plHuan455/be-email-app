import Icon from '@components/atoms/Icon';
import IconButton from '@components/atoms/IconButton';
import {
  Box,
  Button,
  Grid,
  GridProps,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const Content: React.FC<PropsWithChildren & GridProps> = ({
  children,
  ...gridProps
}) => {
  return (
    <Grid container height={'100%'} gap={8} {...gridProps}>
      {children}
    </Grid>
  );
};
const Main: React.FC<
  PropsWithChildren & {
    headTitle?: string;
    onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
  }
> = ({ children, onClickAdd, headTitle }) => {
  return (
    <Grid item flex={1}>
      <Paper className="h-full pt-22.5 px-4 pl-8">
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(2),
            marginBottom: theme.spacing(4),
          })}>
          {headTitle && (
            <Typography
              className="text-[#B2B0EE]"
              variant="h4"
              sx={{ fontWeight: 700 }}>
              {headTitle}
            </Typography>
          )}
          {onClickAdd && (
            <IconButton
              className="bg-transparent hover:bg-transparent"
              size="small"
              onClick={onClickAdd}>
              <Icon icon={'plus'} rawColor={'#827CFF'} width={16} height={16} />
            </IconButton>
          )}
        </Box>
        {children}
      </Paper>
    </Grid>
  );
};

// Require query client to use react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MainQueryClient: React.FC<
  PropsWithChildren & {
    headTitle?: string;
    onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
  }
> = ({ children, onClickAdd, headTitle }) => {
  return (
    <Main headTitle={headTitle} onClickAdd={onClickAdd}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Main>
  );
};

const ASide: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid xs={12} md={3}>
      {children}
    </Grid>
  );
};
const Report: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container spacing={8}>
      {children}
    </Grid>
  );
};
const Chart: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid item xs={12} md={6}>
      {children}
    </Grid>
  );
};

interface GroupButtonProps {
  labelClear?: string;
  labelCancel?: string;
  labelSubmit?: string;
  disabledClear?: boolean;
  disabledCancel?: boolean;
  disabledSubmit?: boolean;
  disabledSticky?: boolean;
  onClear?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const GroupButton: React.FC<GroupButtonProps> = ({
  labelClear = 'Xóa',
  labelCancel = 'Hủy bỏ',
  labelSubmit = 'Xác nhận',
  disabledClear,
  disabledCancel,
  disabledSubmit,
  disabledSticky,
  onClear,
  onCancel,
  onSubmit,
}) => {
  const theme = useTheme();
  return (
    // <Grid xs={12} alignSelf={'flex-end'}>
    <Grid
      container
      xs={12}
      gap={3}
      alignSelf={'flex-end'}
      position={disabledSticky ? 'unset' : 'sticky'}
      paddingY={3}
      bottom={0}
      left={0}
      sx={{
        [theme.breakpoints.down('md')]: {
          ':before': {
            position: 'absolute',
            content: '""',
            width: 'calc(100% + 24px)',
            top: 0,
            right: 0,
            bottom: 0,
            left: -12,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.customShadows[10],
          },
        },
        [theme.breakpoints.down('sm')]: {
          ':before': {
            width: 'calc(100% + 16px)',
            left: -8,
          },
        },
      }}>
      <Button disabled={disabledClear} color="error" size="large" onClick={onClear}>
        {labelClear}
      </Button>
      <Button
        disabled={disabledCancel}
        variant="text"
        size="large"
        onClick={onCancel}
        sx={{ ml: 'auto' }}>
        {labelCancel}
      </Button>
      <Button disabled={disabledSubmit} size="large" onClick={onSubmit}>
        {labelSubmit}
      </Button>
    </Grid>
  );
};

const Layout = {
  Content,
  Main,
  ASide,
  Report,
  Chart,
  GroupButton,
  MainQueryClient,
};

export default Layout;
