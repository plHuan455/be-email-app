import ArrowLeft from '@assets/icon/ArrowLeft';
import Icon from '@components/atoms/Icon';
import IconButton from '@components/atoms/IconButton';
import SearchStartWithIcon from '@components/molecules/Search';
import EmailsListActionsContainer from '@containers/EmailsListActionsContainer';
import SidebarRightContainer from '@containers/SideBarRightContainer';
import InformationBarEmpty from '@layouts/InformationBarEmpty';
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
import { useLocation } from 'react-router-dom';

const Content: React.FC<PropsWithChildren & GridProps> = ({
  children,
  ...gridProps
}) => {
  return (
    <Grid container height={'100%'} {...gridProps}>
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
    <Grid item flex={1} className="w-full">
      <Paper
        sx={{
          padding: 20,
          flex: 1,
          height: '100vh',
          backgroundColor: '#EDEDF3',
          borderTopLeftRadius: '65px',
          overflow: 'hidden',
          position: 'relative',
        }}>
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

const MainHaveActions: React.FC<
  PropsWithChildren & {
    onComback?: () => void;
    isHaveHeader?: boolean;
    isHaveSearch?: boolean;
    isFull?: boolean;
    headTitle?: string;
    rightHeaderTabs?: React.ReactNode;
    onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
  }
> = ({
  children,
  onComback,
  isHaveHeader = true,
  isHaveSearch = false,
  isFull = false,
  headTitle,
  rightHeaderTabs,
  onClickAdd,
}) => {
  // useLocation
  const location = useLocation();
  const pathName = location.pathname.toLowerCase();

  const isShowInformationBtn =
    pathName === '/emails' || pathName.startsWith('/emails/catalog');

  return (
    <Grid item flex={1} xs={12} md={isFull ? 12 : 10} className="w-full">
      <Paper
        sx={{
          padding: 0,
          flex: 1,
          backgroundColor: '#EDEDF3',
          borderTopLeftRadius: '65px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}>
        <Box
          sx={{
            flex: 1,
            height: '100vh',
            overflow: 'scroll',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <EmailsListActionsContainer isShowInformationBtn={isShowInformationBtn} />

          {isHaveHeader && (
            <Box
              className="mt-[100px] justify-between px-6"
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(2),
                marginBottom: theme.spacing(4),
              })}>
              <Box className="flex items-center">
                {onComback && (
                  <Box className="pr-4 hover:cursor-pointer" onClick={onComback}>
                    <ArrowLeft width={22} height={22} color={'#B2B0EE'} />
                  </Box>
                )}
                {headTitle && (
                  <Typography
                    className="text-[#B2B0EE] pr-6"
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
                    <Icon
                      icon={'plus'}
                      rawColor={'#827CFF'}
                      width={16}
                      height={16}
                    />
                  </IconButton>
                )}
              </Box>
              {isHaveSearch && <SearchStartWithIcon />}
              {rightHeaderTabs}
            </Box>
          )}
          {children}
        </Box>
        <SidebarRightContainer
          isShowInformationBtn={isShowInformationBtn}
          isBorderBottom={true}
        />
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
    onComback?: () => void;
    isHaveHeader?: boolean;
    isHaveSearch?: boolean;
    isFull?: boolean;
    headTitle?: string;
    rightHeaderTabs?: React.ReactNode;
    onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
  }
> = ({
  children,
  onComback,
  isHaveHeader = true,
  isHaveSearch = false,
  isFull = false,
  rightHeaderTabs,
  onClickAdd,
  headTitle,
}) => {
  return (
    <MainHaveActions
      onComback={onComback}
      isHaveHeader={isHaveHeader}
      isHaveSearch={isHaveSearch}
      isFull={isFull}
      headTitle={headTitle}
      onClickAdd={onClickAdd}
      rightHeaderTabs={rightHeaderTabs}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MainHaveActions>
  );
};

const ASide: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid xs={12} md={2}>
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
      position={'absolute'}
      paddingY={5}
      paddingX={5}
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
  MainHaveActions,
  ASide,
  Report,
  Chart,
  GroupButton,
  MainQueryClient,
};

export default Layout;
