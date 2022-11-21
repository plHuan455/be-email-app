import { SVGProps } from '@components/atoms/Icon';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

const Donut: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <DonutSmallIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Donut;
