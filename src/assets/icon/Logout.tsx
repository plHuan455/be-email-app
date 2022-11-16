import { SVGProps } from '@components/atoms/Icon';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Logout: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <LogoutOutlinedIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
        transform: 'rotate(180deg)',
      }}
    />
  );
};

export default Logout;
