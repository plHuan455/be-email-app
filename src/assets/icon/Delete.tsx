import { SVGProps } from '@components/atoms/Icon';
import DeleteIcon from '@mui/icons-material/Delete';

const Delete: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <DeleteIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default Delete;
