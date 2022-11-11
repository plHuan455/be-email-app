import { SVGProps } from '@components/atoms/Icon';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Seen: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <RemoveRedEyeOutlinedIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Seen;
