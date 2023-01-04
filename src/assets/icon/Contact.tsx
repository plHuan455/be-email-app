import { SVGIconProps } from '@components/atoms/Icon';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const Contact: React.FC<SVGIconProps> = ({ width, height, color }) => {
  return (
    <PermContactCalendarIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Contact;
