import { uploadFile } from '@api/uploadFile';
import WindowActions from '@components/molecules/WindowActions';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { rem } from '@utils/functions';
import { useEffect } from 'react';

interface MinimizeEmailProps {
  title: string;
  data?: any;
  onUploading?: (state: boolean) => void;
  onMaximizeClick: () => void;
  onCloseClick: () => void;
}

const MinimizeEmail: React.FC<MinimizeEmailProps> = ({
  title,
  data,
  onUploading,
  onMaximizeClick,
  onCloseClick,
}) => {
  return (
    <Box className="o-minimizeEmail" display="flex" alignItems="center">
      <Typography
        variant="body1"
        className="o-minimizeEmail_text"
        sx={{
          width: rem(246),
          py: rem(8),
          flexGrow: 1,
          fontSize: rem(14),
          fontWeight: 500,
          lineHeight: rem(30),
          marginLeft: rem(16),
          flexWrap: 'nowrap',
        }}>
        {title}
      </Typography>

      <Box
        flexShrink={1}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {data.attachFiles?.files?.length > 0 && (
          <Typography>
            {
              data.attachFiles?.files.filter((file) => file?.percentage === 100)
                .length
            }
            /{data.attachFiles?.files.length}
          </Typography>
        )}
        <WindowActions
          onMaximizeClick={onMaximizeClick}
          onCloseClick={onCloseClick}
        />
      </Box>
    </Box>
  );
};

export default MinimizeEmail;
