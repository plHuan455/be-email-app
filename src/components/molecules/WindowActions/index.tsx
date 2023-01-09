import { Box, Button } from "@mui/material";
import MaximizeIcon from '@mui/icons-material/Maximize';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import { rem } from "@utils/functions";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

interface WindowActionsProps {
  onMaximizeClick?: () => void;
  onCloseClick?: () => void;
}

const WindowActions: React.FC<WindowActionsProps> = ({
  onMaximizeClick,
  onCloseClick,
}) => {
  return (
    <Box 
      className="m-windowActions"
      display="flex"
    >
      <Button 
        variant="text" 
        endIcon={<KeyboardDoubleArrowUpIcon />} 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: rem(4),
          minWidth: 'auto',
          '.MuiButton-endIcon': {
            margin: 0,
          }
        }}
        onClick={() => {
          if(onMaximizeClick) onMaximizeClick();
        }}
      />
      <Button 
        variant="text" 
        endIcon={<CloseIcon />} 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: rem(4),
          minWidth: 'auto',
          '.MuiButton-endIcon': {
            margin: 0,
          }
        }}
        onClick={() => {
          if(onCloseClick) onCloseClick();
        }}
      />

    </Box>
)}

export default WindowActions;