import { Box, Button } from "@mui/material"
import { rem } from "@utils/functions";

interface ControlEmailSendProps { 
  title?: string;
  renameMinutes?: number;
  onUndo?: () => void;
  onSend?: () => void;
}

const ControlEmailSend: React.FC<ControlEmailSendProps> = ({
  title = "This email will be sent in: ",
  renameMinutes = 0,
  onUndo,
  onSend,
}) => {
  return (<Box className="t-controlEmailSend flex actions justify-end py-4">
    <Box className="flex items-center px-4 py-2 rounded-[16px]"
      sx={{
        backgroundColor: '#F6F3FD',
        fontSize: rem(12),
        lineHeight: rem(13),
        color: '#181818'
      }}
    >
      <Box className="pr-7">
        <p className="text-[#181818] text-[14px] font-normal">
          {title}
          <span className="text-[#554CFF] inline-block pl-1">{renameMinutes} minutes</span>
        </p>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{ml: rem(12)}}
      >
        <Button 
          variant="text"
          sx={{
            fontWeight: 700,
            color: '#181818',
            fontSize: rem(10),
            lineHeight: rem(12),
          }}
          onClick={onSend}
        >
          Undo
        </Button>
        <Button
          variant="text" 
          sx={{
            fontWeight: 700,
            color: '#FFB800',
            fontSize: rem(10),
            lineHeight: rem(12),
          }}
          onClick={onUndo}
        >
          Send
        </Button>
      </Box>
    </Box>
  </Box>)
}

export default ControlEmailSend