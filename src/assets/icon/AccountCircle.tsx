import { SVGProps } from '@components/atoms/Icon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const AccountCircle: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <AccountCircleOutlinedIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default AccountCircle;
