import { SVGProps } from '@components/atoms/Icon';
import DialpadIcon from '@mui/icons-material/Dialpad';

const Dialpad: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <DialpadIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Dialpad;
