import { SVGProps } from '@components/atoms/Icon';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

const Delete: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <MarkAsUnreadIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Delete;
