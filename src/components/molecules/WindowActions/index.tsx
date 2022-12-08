import { Box, Button } from "@mui/material";
import MaximizeIcon from '@mui/icons-material/Maximize';
import CloseIcon from '@mui/icons-material/Close';
import { rem } from "@utils/functions";

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
        endIcon={<MaximizeIcon />} 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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