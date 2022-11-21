import { SVGProps } from '@components/atoms/Icon';
import EmailIcon from '@mui/icons-material/Email';

const Email: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <EmailIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Email;
