import { Box, Button } from "@mui/material"
import { rem } from "@utils/functions";
import { useEffect, useState } from "react";

interface ControlEmailSendProps {
  title?: string;
  remainMinutes?: number;
  variant?: 'cancel' | 'undoSendNow'
  onUndo?: () => void;
  onSend?: () => void;
  onCancel?: () => void;
}

const ControlEmailSend: React.FC<ControlEmailSendProps> = ({
  title = "This email will be sent in: ",
  remainMinutes = 0,
  variant = 'undoSendNow',
  onUndo,
  onSend,
  onCancel,
}) => {
  const [remainMinutesState, setRemainMinutesState] = useState<number>(remainMinutes);
  useEffect(() => {
    const handleInterval = setInterval(() => {
      setRemainMinutesState(preState => {
        if (preState <= 0) return 0;
        return preState - 1;
      })
    }, 60000)

    return () => clearInterval(handleInterval);
  }, [remainMinutes])

  if(remainMinutesState <= 0) return null

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
          <span className="text-[#554CFF] inline-block pl-1">{remainMinutesState} minutes</span>
        </p>
      </Box>
      {variant === 'undoSendNow' && (<Box
        display="flex"
        alignItems="center"
        sx={{ ml: rem(12) }}
      >
        <Button
          variant="text"
          sx={{
            fontWeight: 700,
            color: '#181818',
            fontSize: rem(10),
            lineHeight: rem(12),
          }}
          onClick={onUndo}
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
          onClick={onSend}
        >
          Send
        </Button>
      </Box>)}

      {variant === 'cancel' && (
        <Box>
          <Button className="bg-transparent hover:bg-slate-200 text-[#554CFF] font-bold" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  </Box>)
}

export default ControlEmailSend