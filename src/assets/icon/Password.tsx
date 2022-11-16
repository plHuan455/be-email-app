import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { SVGProps } from '@components/atoms/Icon';

const Password: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <HttpsOutlinedIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Password;
