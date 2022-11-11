import { SVGProps } from '@components/atoms/Icon';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Sending: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <SendOutlinedIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Sending;
