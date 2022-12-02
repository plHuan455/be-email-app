import { SVGProps } from '@components/atoms/Icon';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const ManagerAccount: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <ManageAccountsIcon
      className="text-[18px]"
      sx={{
        width: width,
        height: height,
        color: color,
      }}
    />
  );
};

export default ManagerAccount;
