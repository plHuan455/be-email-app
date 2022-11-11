import { SVGProps } from '@components/atoms/Icon';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const Pending: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <HourglassBottomIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Pending;
