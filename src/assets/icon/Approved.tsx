import { SVGProps } from '@components/atoms/Icon';
import CheckIcon from '@mui/icons-material/Check';

const Approved: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <CheckIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Approved;
