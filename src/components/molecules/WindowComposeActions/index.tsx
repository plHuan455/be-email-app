import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useEmailCompose from '../../../zustand/useEmailCompose';
import { RenderButtonIcon } from '../EmailActions';

interface WindowComposeActionsProps {
  className?: string;
  onMinimize: () => void;
}

function WindowComposeActions({ className, onMinimize }: WindowComposeActionsProps) {
  const { isZoom, reset, negativeIsZoom } = useEmailCompose();

  const navigate = useNavigate();

  const handleClose = () => {
    reset();
    navigate(-1);
  };

  const handleMinimize = () => {
    onMinimize();
  };

  const handleZoom = () => {
    negativeIsZoom();
  };

  const WINDOWCOMPOSEACTIONS = {
    minus: {
      item: 'minus',
      color: '#9E96BE',
      onClick: handleMinimize,
    },
    square: {
      item: isZoom ? 'squareCropDin' : 'square',
      color: '#9E96BE',
      onClick: handleZoom,
    },
    close: {
      item: 'close',
      color: '#9E96BE',
      onClick: handleClose,
    },
  };

  return (
    <Box className={`flex gap-x-1.5 justify-end ${className}`}>
      {Object.keys(WINDOWCOMPOSEACTIONS).map((val) => {
        const currVal = WINDOWCOMPOSEACTIONS[val];

        return (
          <RenderButtonIcon
            onClick={currVal.onClick}
            item={currVal.item}
            key={val}
            color={currVal.color}
            className="p-1 ease-in duration-300 rounded hover:bg-[#F2F2F2] hover:cursor-pointer hover:scale-110"
          />
        );
      })}
    </Box>
  );
}

export default WindowComposeActions;
