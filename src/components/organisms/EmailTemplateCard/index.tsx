import { Box, ImageListItem, Typography } from "@mui/material";
import { rem } from "@utils/functions";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableActionsMenu from "@components/molecules/TableActionsMenu";
import { useState } from "react";
import { fontWeight } from "@mui/system";

interface EmailTemplateCardProps {
  isShowActionsWhenHover?: boolean;
  hoverLayerLabel?: string;
  name: string;
  description: string;
  src: string;
  onUpdateClick: () => void;
  onClick?: () => void;
}

const EmailTemplateCard: React.FC<EmailTemplateCardProps> = ({
  isShowActionsWhenHover = true,
  hoverLayerLabel = 'select',
  src,
  name,
  description,
  onUpdateClick,
  onClick,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpenMenuActions, setIsOpenMenuActions] = useState<boolean>(false);

  return (
    <Box
      className="o-emailTemplateCard"
      sx={{
        width: '100%',
        position: 'relative',
        cursor: 'pointer',
        '&:hover .o-emailTemplateCard_actionBtn': {
          // opacity: 1
        }
      }}
      onMouseOver={(e) => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      onClick={() => {onClick && onClick()}}
    >
      <Box
        className="o-emailTemplateCard_imgWrapper"
        sx={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', backgroundColor: 'rgba(64,87,109,0.07)', pt: rem(12), px: rem(12), borderRadius: rem(8), overflow: 'hidden' }}
      >
        <Box sx={{ width: '100%', backgroundColor: 'white', height: '100%', overflow: 'hidden' }}>
          <img className="o-emailTemplateCard_img" src={src} />
        </Box>
        {isHover && <Box
          className="o-emailTemplate_layer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, .40)', borderRadius: rem(8) }}
        >
          <Typography variant="body2" sx={{color: '#fff', fontSize: rem(14), lineHeight: rem(16), fontWeight: 600}}>
            {hoverLayerLabel}
          </Typography>
        </Box>}
      </Box>
      <Box className="o-emailTemplateCard_title" sx={{ mt: rem(10) }}>
        <Typography variant="body1" sx={{ color: '#0D1216', fontWeight: 500 }}>{name}</Typography>
      </Box>
      <Box className="o-emailTemplateCard_description" sx={{ mt: rem(3) }}>
        <Typography sx={{ color: '#0D1216B3' }}>{description}</Typography>
      </Box>

      {isShowActionsWhenHover && isHover && <Box
        className="o-emailTemplateCard_actionBtn"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'absolute',
          top: rem(8),
          right: rem(8),
          width: rem(34),
          height: rem(30),
          backgroundColor: '#fff',
          cursor: 'pointer',
          borderRadius: rem(4),
          '&:hover': {
            backgroundColor: '#e9e7e7'
          }
        }}
      >
        <TableActionsMenu
          isAuto={false}
          isOpen={isOpenMenuActions}
          sx={{ maxWidth: rem(52), minWidth: rem(52) }}
          options={[
            { value: 0, label: 'Update', icon: <UpdateIcon /> },
            { value: 1, label: 'Delete', icon: <DeleteIcon /> },
          ]}
          onItemClick={(value, e) => {
            e.stopPropagation();
            if (value === 0) {
              onUpdateClick();
            }
            if (value === 1) {
              // onDepartmentDeleteClick(row.id);
            }
            setIsOpenMenuActions(false)
            setIsHover(false)
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenMenuActions(true)
          }}
          onClose={() => {
            setIsOpenMenuActions(false)
            setIsHover(false)
          }}
        />
      </Box>}
    </Box>
  )
}

export default EmailTemplateCard;