import { SVGProps } from '@components/atoms/Icon';
import PeopleIcon from '@mui/icons-material/People';

const People: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <PeopleIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default People;
