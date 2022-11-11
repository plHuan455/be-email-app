import { SVGProps } from '@components/atoms/Icon';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Sent: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <DoneAllIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Sent;
