import RemoveIcon from '@mui/icons-material/Remove';
import { SVGProps } from '@components/atoms/Icon';

const Minus: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <RemoveIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Minus;
