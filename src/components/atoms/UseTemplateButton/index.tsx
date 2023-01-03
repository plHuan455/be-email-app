import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import ArticleIcon from '@mui/icons-material/Article';

interface TemplateSetting {
  name: string;
  id: number;
}

interface Props {
  className?: string;
  settings: TemplateSetting[];
  onSettingClick?: (settingId: number) => void;
}

const UseTemplateButton: React.FC<Props> = ({
  className,
  settings,
  onSettingClick,
}) => {
  const [anchorElSelectTemplatePopup, setAnchorElSelectTemplatePopup] =
    React.useState(null);

  const handleOpenTemplatePopup = (event) => {
    setAnchorElSelectTemplatePopup(event.currentTarget);
  };

  const handleCloseTemplatePopup = () => {
    setAnchorElSelectTemplatePopup(null);
  };

  return (
    <Box className={className}>
      <Button
        className="bg-transparent p-2 hover:bg-transparent"
        onClick={handleOpenTemplatePopup}>
        <ArticleIcon className="text-[#7D7E80]" />
      </Button>
      <Menu
        sx={{
          mt: '45px',
          '& > .MuiPaper-root': {
            padding: 0,
            backgroundColor: 'transparent',
            transform: 'translateY(-50%) !important',
            '& > .MuiList-root': {
              maxWidth: '260px',
              display: 'flex',
              flexWrap: 'wrap',
              paddingInline: 1,
              gap: '12px',
              '& > .MuiButtonBase-root': {
                whiteSpace: 'break-spaces',
                width: '120px',
                backgroundColor: 'rgba(126, 115, 148, 0.9)',
                justifyContent: 'center',
                borderRadius: '5px',
                transition: '0.4s',
                '& > .MuiTypography-root': {
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 600,
                  textAlign: 'center',
                },
                '&:hover': {
                  backgroundColor: 'rgba(126, 115, 148, 1)',
                  transform: 'scale(1.1)',
                },
              },
            },
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElSelectTemplatePopup}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={Boolean(anchorElSelectTemplatePopup)}
        onClose={handleCloseTemplatePopup}>
        {settings.map((setting, index) => {
          return (
            <MenuItem
              key={setting.id}
              className="w-full"
              onClick={() => {
                handleCloseTemplatePopup();
                onSettingClick && onSettingClick(setting.id);
              }}>
              <Typography textAlign="center">{setting.name}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default UseTemplateButton;
