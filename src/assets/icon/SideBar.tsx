import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { SVGProps } from '@components/atoms/Icon';

const SideBar: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <ViewSidebarIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default SideBar;
