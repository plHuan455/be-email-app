import { UserInfo } from '@components/organisms/Email/Interface';
import MinimizeEmail from '@components/organisms/MinimizeEmail';
import { Box } from '@mui/material';
import { rem } from '@utils/functions';

export interface MinimizeEmailTypes {
  id?: string;
  to?: UserInfo[];
  cc?: UserInfo[];
  bcc?: UserInfo[];
  attachFiles?: File[];
  subject?: string;
  content?: string;
  sendAt?: string | null;
  color?: string;
}

interface MinimizeEmailListProps {
  data: MinimizeEmailTypes[];
  onMaximizeClick: (data: MinimizeEmailTypes) => void;
  onCloseClick: (data: MinimizeEmailTypes) => void;
}

const MinimizeEmailList: React.FC<MinimizeEmailListProps> = ({
  data= [],
  onMaximizeClick,
  onCloseClick,
}) => {
  return <div className="t-minimizeEmailList">
    {data.map((value, index) => (
      <Box className="t-minimizeEmailList_item" sx={{backgroundColor: value.color ?? '#f2f6fc'}} key={`minimize-email-list-${value.id}`}>
        <MinimizeEmail 
          key={`minimize-email-list-${index}`} 
          title={value.subject || 'New Message'}
          onMaximizeClick={() => onMaximizeClick(value)}
          onCloseClick={() => onCloseClick(value)}
        />
      </Box>
    ))}
  </div>
}

export default MinimizeEmailList