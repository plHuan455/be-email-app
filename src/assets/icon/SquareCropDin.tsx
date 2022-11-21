import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import { SVGProps } from '@components/atoms/Icon';

const SquareCropDin: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <CropFreeOutlinedIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default SquareCropDin;
