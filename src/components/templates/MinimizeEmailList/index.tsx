import { Email, UserInfo } from '@components/organisms/Email/Interface';
import MinimizeEmail from '@components/organisms/MinimizeEmail';
import { Box } from '@mui/material';
import { rem } from '@utils/functions';


interface MinimizeEmailListProps {
  data: Partial<Email>[];
  onMaximizeClick: (data: Partial<Email>) => void;
  onCloseClick: (data: Partial<Email>) => void;
}

const MinimizeEmailList: React.FC<MinimizeEmailListProps> = ({
  data= [],
  onMaximizeClick,
  onCloseClick,
}) => {
  return <div className="t-minimizeEmailList">
    {data.map((value, index) => (
      <Box className="t-minimizeEmailList_item">
        <MinimizeEmail 
          key={`minimize-email-list-${index}`} 
          title={value.title || 'New Message'}
          onMaximizeClick={() => onMaximizeClick(value)}
          onCloseClick={() => onCloseClick(value)}
        />
      </Box>
    ))}
  </div>
}

export default MinimizeEmailList