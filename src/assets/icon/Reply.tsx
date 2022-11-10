import { SVGProps } from '@components/atoms/Icon';
import ReplyIcon from '@mui/icons-material/Reply';

const Reply: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <ReplyIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Reply;
