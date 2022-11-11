import { SVGProps } from '@components/atoms/Icon';
import CropDinIcon from '@mui/icons-material/CropDin';

const Square: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <CropDinIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Square;
