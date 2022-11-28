import { SVGProps } from '@components/atoms/Icon';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const More: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <MoreHorizIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default More;
