import { SVGProps } from '@components/atoms/Icon';
import ForwardIcon from '@mui/icons-material/Forward';

const Forward: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <ForwardIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Forward;
