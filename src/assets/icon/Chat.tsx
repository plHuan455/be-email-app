import { SVGProps } from '@components/atoms/Icon';
import ChatIcon from '@mui/icons-material/Chat';

const Chat: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <ChatIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Chat;
