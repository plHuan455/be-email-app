import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SelectBox from '../SelectBox';
import Input from '../Input';
import { Button } from '@mui/material';

export interface ModalBaseProps extends React.PropsWithChildren {
  isOpen: boolean;
  title: string;
  onClose?: () => void;
  onSubmit?: () => void;
  style?: any;
  submitLabel?: string;
  cancelLabel?: string;
  modalType?: 'submit' | 'button';
}

const modalDefaultStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  padding: '16px',
  outline: 'none',
};

const ModalBase: React.FC<ModalBaseProps> = ({
  isOpen,
  style,
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = 'CREATE',
  cancelLabel = 'CANCEL',
  modalType = 'button',
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}>
      <Box sx={{ ...modalDefaultStyle, ...style }}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <div className="modal-close-button" onClick={onClose}>
              X
            </div>
          </div>
          <div
            className="modal-content"
            style={{
              paddingBottom: Boolean(submitLabel) ? '50px' : 0,
            }}>
            <div className="modal-content-scroll">{children}</div>
          </div>
          {Boolean(submitLabel) && (
            <div className="modal-button-bottom">
              <Button
                className="button-create-mui"
                onClick={onSubmit}
                type={modalType}>
                {submitLabel}
              </Button>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ModalBase;
