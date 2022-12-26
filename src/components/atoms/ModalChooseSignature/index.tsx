import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SelectBox from '../SelectBox';
import Input from '../Input';
import { Button } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
import Icon from '../Icon';
import { rowsSign } from '@containers/SignatureContainer';
import { useSelector } from 'react-redux';
import { getDefaultSignId } from '@redux/selector';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (val: any) => void;
}

const ModalChooseSignature: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  // redux
  const defaultSignId = useSelector(getDefaultSignId);

  // states
  const [signDefault, setSignDefault] = useState<number>(defaultSignId);

  useEffect(() => {
    console.log('mount');

    return () => {
      console.log('unmount');
    };
  }, []);

  // functions
  const handleChangeSign = (signId: number) => {
    setSignDefault(signId);
  };

  const handleSubmitSign = () => {
    const rItem = rowsSign.find((e) => e.id === signDefault);
    console.log('r item --->', rItem);
    onSubmit && onSubmit(rItem?.signature);
    onClose && onClose();
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
            <div className="modal-header-pencolor">CHOOSE YOUR SIGNATURE</div>
            <div className="modal-close-button" onClick={onClose}>
              X
            </div>
          </div>
          <div className="modal-sign-content">
            <div className="modal-sign-content-scroll">
              {rowsSign.map((e, index) => {
                return (
                  <div
                    key={index}
                    className="wrap-sign-img"
                    onClick={() => handleChangeSign(e.id)}>
                    <img className="img-sign" src={e.signature} />
                    {e.id === signDefault && (
                      <div className="circle-check">
                        <CheckCircleIcon />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-sign-bottom">
            <div className="wrap-button">
              <Button
                fullWidth
                variant="outlined"
                color="error"
                size="large"
                onClick={onClose}>
                CANCEL
              </Button>
            </div>
            <div className="wrap-button">
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleSubmitSign}>
                CONFIRM
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalChooseSignature;

const modalDefaultStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 680,
  height: 350,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  padding: '16px',
};

const colors = ['black', 'green', 'red'];
