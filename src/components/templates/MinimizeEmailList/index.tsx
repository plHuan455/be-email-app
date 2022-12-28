import { UserInfo } from '@components/organisms/Email/Interface';
import MinimizeEmail from '@components/organisms/MinimizeEmail';
import { Box } from '@mui/material';
import { rem } from '@utils/functions';
import { motion, usePresence, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { InputContactBlock } from '@components/molecules/AutoCompleteReceive';
import { HashtagTabs } from '@redux/Email/reducer';
import { CustomFile } from '../EmailCompose2';

export interface MinimizeEmailTypes {
  id?: number;
  cacheId?: number;
  contactBlock?: InputContactBlock[];
  to?: InputContactBlock[];
  cc?: InputContactBlock[];
  bcc?: InputContactBlock[];
  attachFiles?: {
    files: (CustomFile | undefined)[];
    fileUrls: (string | undefined)[];
  };
  subject?: string;
  content?: string;
  sendAt?: string | null;
  color?: string;
  fileUrls?: (string | undefined)[];
  hashtags?: { name: string; value: string }[];
}

interface MinimizeEmailListProps {
  data: MinimizeEmailTypes[];
  showMinimizeEmailId?: { id?: number; cacheId?: number };
  onMaximizeClick: (data: MinimizeEmailTypes) => void;
  onCloseClick: (data: MinimizeEmailTypes) => void;
}

const MinimizeEmailList: React.FC<MinimizeEmailListProps> = ({
  data = [],
  showMinimizeEmailId,
  onMaximizeClick,
  onCloseClick,
}) => {
  const location = useLocation();

  const handleCloseMiniMail = (index: number, value) => {
    onCloseClick(value);
  };

  return (
    <div className="t-minimizeEmailList">
      <AnimatePresence>
        {data.map((value, index) => (
          <motion.div
            key={`minimize-email-list-${index}`}
            className="t-minimizeEmailList_itemWrapper"
            style={{ position: 'relative', marginLeft: rem(5), height: rem(46) }}
            initial={{ width: 0, marginLeft: 0 }}
            animate={{ 
              width: value.id === showMinimizeEmailId?.id && value.id !== undefined? 0 : rem(260),
              marginLeft: rem(5)
            }}
            exit={{ width: 0, marginLeft: 0 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 50,
              mass: 1,
              duration: 0.2,
            }}>
            <motion.div
              className="t-minimizeEmailList_item"
              initial={
                location.pathname === '/emails/compose'
                  ? {
                      translateY: '-800px',
                      translateX: '-100px',
                      opacity: 0,
                      width: rem(500),
                    }
                  : {}
              }
              animate={
                (value.cacheId === showMinimizeEmailId?.cacheId &&
                  value.cacheId !== undefined) ||
                (value.id === showMinimizeEmailId?.id && value.id !== undefined)
                  ? {
                      translateY: '-800px',
                      translateX: '-100px',
                      opacity: 0,
                      width: rem(500),
                    }
                  : { translateY: 0, translateX: 0, opacity: 1, width: rem(260) }
              }
              exit={{
                opacity: 0,
                width: rem(500),
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 50,
                mass: 1,
                duration: 0.2,
              }}
              style={{
                width: rem(260),
                height: rem(46),
                position: 'absolute',
                backgroundColor: value.color ? value.color : '#f2f6fc',
              }}>
              <MinimizeEmail
                key={`minimize-email-list-${index}`}
                data={value}
                title={value.subject || 'New Message'}
                onMaximizeClick={() => onMaximizeClick(value)}
                onCloseClick={() => handleCloseMiniMail(index, value)}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MinimizeEmailList;
