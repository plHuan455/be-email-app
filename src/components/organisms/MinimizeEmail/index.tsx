import WindowActions from "@components/molecules/WindowActions";
import { Box, Typography } from "@mui/material"
import { rem } from "@utils/functions";

interface MinimizeEmailProps {
  title: string;
  onMaximizeClick: () => void;
  onCloseClick: () => void;
}

const MinimizeEmail: React.FC<MinimizeEmailProps> = ({ title, onMaximizeClick, onCloseClick }) => {
  return <Box
    className="o-minimizeEmail"
    display="flex"
    alignItems="center"
  >
    <Typography
      variant="body1"
      className="o-minimizeEmail_text"
      sx={{
        width: rem(246),
        py: rem(8),
        flexGrow: 1,
        fontSize: rem(14),
        fontWeight: 500,
        lineHeight: rem(30),
        marginLeft: rem(16),
        flexWrap: 'nowrap'
      }}
    >
      {title}
    </Typography>
    <Box flexShrink={1}>
      <WindowActions onMaximizeClick={onMaximizeClick} onCloseClick={onCloseClick} />
    </Box>
  </Box>
}

export default MinimizeEmail