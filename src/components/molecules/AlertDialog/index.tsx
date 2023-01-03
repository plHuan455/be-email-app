import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import { rem } from '@utils/functions';
import React, { useCallback, useRef, useState } from 'react';

export interface AlertDialogProps {
  isLoading?: boolean;
  titleLabel: string;
  descriptionLabel: React.ReactNode;
  isOpen: boolean;
  isShowDisagreeBtn?: boolean;
  onAgree?: () => void;
  onDisagree?: () => void;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const useAlertDialog = (isOpenDefault: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const alertDataRef = useRef<{
    title: string;
    description: React.ReactNode;
    callback: () => void;
    onCloseCallBack?: () => void;
  }>({
    title: '',
    description: '',
    callback: () => {},
  });

  const setAlertData = (
    title: string,
    description: React.ReactNode,
    callback: () => void,
    onCloseCallBack?: () => void,
  ) => {
    alertDataRef.current = {
      title,
      description,
      callback,
      onCloseCallBack,
    };
    setIsOpen(true);
  };

  const onClose = useCallback(() => {
    alertDataRef.current = {
      title: '',
      description: '',
      callback: () => {},
    };

    setIsOpen(false);
    setIsLoading(false);
  }, [setIsOpen]);

  return {
    isOpen,
    isLoading,
    title: alertDataRef.current.title,
    description: alertDataRef.current.description,
    callback: alertDataRef.current.callback,
    onCloseCallBack: alertDataRef.current.onCloseCallBack,
    setAlertData,
    setIsLoading,
    onClose,
  };
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  isLoading = false,
  titleLabel,
  descriptionLabel,
  isOpen,
  isShowDisagreeBtn = true,
  onDisagree,
  onAgree,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description">
      <div className="m-alertDialog">
        <DialogTitle>{titleLabel}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {descriptionLabel}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex justify-around">
          {isShowDisagreeBtn && (
            <Button
              sx={{
                color: '#dc3545',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#554cff',
                },
              }}
              onClick={onDisagree}>
              Cancel
            </Button>
          )}
          <LoadingButton
            loading={isLoading}
            sx={{
              color: '#198754',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              '&:hover': {
                color: 'white',
                backgroundColor: '#554cff',
              },
              '&.MuiLoadingButton-loading': {
                backgroundColor: '#b0aded',
              },
              ml: '24px !important',
            }}
            onClick={onAgree}>
            Agree
          </LoadingButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AlertDialog;
