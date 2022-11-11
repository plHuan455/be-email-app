import { SVGProps } from '@components/atoms/Icon';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const ReplyAll: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <ReplyAllIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default ReplyAll;
