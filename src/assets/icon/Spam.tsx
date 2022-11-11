import { SVGProps } from '@components/atoms/Icon';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Spam: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <ReportGmailerrorredIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Spam;
