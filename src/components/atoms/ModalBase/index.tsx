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
  modalType?: 'submit' | 'submit/cancel';
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
  modalType = 'submit/cancel',
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
          <div className="modal-content">
            <div className="modal-content-scroll">{children}</div>
          </div>
          <div className="modal-button-bottom flex gap-2">
            {modalType === 'submit' && (
              <Button className="button-create-mui" onClick={onSubmit}>
                {submitLabel}
              </Button>
            )}
            {modalType === 'submit/cancel' && (
              <>
                <Button className="button-create-mui" onClick={onSubmit}>
                  {submitLabel}
                </Button>
                <Button
                  className="button-create-mui"
                  onClick={onClose}
                  sx={{
                    backgroundColor: '#E0E0EA !important',
                    color: '#7D7E80 !important',
                  }}>
                  {cancelLabel}
                </Button>
              </>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalBase;
