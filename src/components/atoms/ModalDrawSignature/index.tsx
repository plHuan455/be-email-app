import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SelectBox from '../SelectBox';
import Input from '../Input';
import { Button } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
import Icon from '../Icon';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (val: any) => void;
}

const ModalDrawSignature: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [penColor, setPenColor] = useState('black');
  const signRef = useRef<any>();

  const createSignature = () => {
    if (signRef.current && signRef) {
      if (signRef.current.isEmpty()) {
        return toast.error('Your sign is empty!');
      }
      const url = signRef.current.getTrimmedCanvas().toDataURL('image/png');
      onSubmit && onSubmit(url);
      onClose && onClose();
    }
  };

  const clearSignature = () => {
    if (signRef.current && signRef) {
      signRef.current.clear();
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition>
      <Box sx={{ ...modalDefaultStyle }}>
        <div className="modal-sign-container">
          <div className="modal-sign-header">
            <div className="modal-header-pencolor">
              {colors.map((color) => {
                return (
                  <div
                    className={`pencolor-circle ${color} ${
                      color === penColor ? 'active-pencolor' : ''
                    }`}
                    key={color}
                    onClick={() => setPenColor(color)}>
                    {color === penColor && <Icon icon="check" />}
                  </div>
                );
              })}
            </div>
            <div className="modal-close-button" onClick={onClose}>
              X
            </div>
          </div>
          <div className="modal-sign-content">
            <div className="modal-sign-content-scroll">
              <SignatureCanvas
                ref={signRef}
                penColor={penColor}
                canvasProps={{
                  className: 'sigCanvas',
                }}
              />
            </div>
          </div>
          <div className="modal-sign-bottom">
            <div className="wrap-button">
              <Button
                fullWidth
                variant="outlined"
                color="error"
                size="large"
                onClick={clearSignature}>
                CLEAR
              </Button>
            </div>
            <div className="wrap-button">
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={createSignature}>
                SIGN
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDrawSignature;

const modalDefaultStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 600,
  height: 350,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  padding: '16px',
};

const colors = ['black', 'green', 'red'];
