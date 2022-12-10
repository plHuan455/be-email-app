import { UserInfo } from '@components/organisms/Email/Interface';
import MinimizeEmail from '@components/organisms/MinimizeEmail';
import { Box } from '@mui/material';
import { rem } from '@utils/functions';
import classNames from 'classnames';

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
  hideEmailId?: string;
  onMaximizeClick: (data: MinimizeEmailTypes) => void;
  onCloseClick: (data: MinimizeEmailTypes) => void;
}

const MinimizeEmailList: React.FC<MinimizeEmailListProps> = ({
  data= [],
  hideEmailId,
  onMaximizeClick,
  onCloseClick,
}) => {
  return <div className="t-minimizeEmailList">
    {data.map((value, index) => (
      <Box 
        className={classNames("t-minimizeEmailList_item", hideEmailId === value.id && 'minimizeEmailList_item-hidden')} 
        sx={{backgroundColor: value.color ? value.color : '#f2f6fc'}} 
        key={`minimize-email-list-${value.id}`}
        style={hideEmailId === value.id ? {width: 0} : {}}
      >
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