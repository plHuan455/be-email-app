import EmailTemplateCard from "@components/organisms/EmailTemplateCard";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system"
import { rem } from "@utils/functions";
import { NavLink } from "react-router-dom";

export interface EmailTemplateItem {
  id: number;
  name: string;
  htmlString: string;
  description: string;
  imgSrc: string;
}

interface EmailTemplateListProps {
  isShowTemplateActionWhenHover?: boolean;
  selectedTemplateId?: number;
  emailTemplateList: EmailTemplateItem[];
  onUpdateClick?: (templateId: number) => void;
  onDeleteTemplate?: (templateId: number) => void;
  onTemplateClick?: (templateId: EmailTemplateItem) => void;
  onEmptyAddTemplateClick?: () => void;
}

const EmailTemplateList: React.FC<EmailTemplateListProps> = ({
  isShowTemplateActionWhenHover = true,
  selectedTemplateId,
  emailTemplateList,
  onUpdateClick,
  onDeleteTemplate,
  onTemplateClick,
  onEmptyAddTemplateClick,
}) => {
  const theme = useTheme();
  return (
    <Box 
      className="t-emailTemplateList px-6" 
    >
      <Box sx={{mb: rem(12)}}>
        <Typography sx={{color: '#0D1216', fontSize: rem(20), fontWeight: 600}}>Recent templates</Typography>
      </Box>
      <Box 
        display="flex"
        sx={{margin: rem(-12), flexWrap: 'wrap'}}
      >
        {emailTemplateList.length === 0 && (
          <Box sx={{py: rem(24), width: '100%'}} display="flex" alignItems="center"  justifyContent="center">
            <Typography textAlign="center">
              There's is no template
            </Typography>
            {Boolean(onEmptyAddTemplateClick) && <Button variant="text" sx={{color: '#554cff', padding: 0, ml: rem(4)}} onClick={() => onEmptyAddTemplateClick && onEmptyAddTemplateClick()}>
              add template
            </Button>}
          </Box>
        )}
        {emailTemplateList.map(value => (
          <Box
            sx={{ 
              flexBasis: 'calc(100% / 3)', 
              padding: rem(12),
              border: selectedTemplateId === value.id ? '2px solid #7061e2' : '0',
              borderRadius: rem(8),
              [theme.breakpoints.up('md')]: {
                flexBasis: 'calc(100% / 5)', 
              }
            }}
            key={value.id}
          >
            <EmailTemplateCard
              isShowActionsWhenHover={isShowTemplateActionWhenHover}
              src={value.imgSrc}
              name={value.name}
              hoverLayerLabel={selectedTemplateId === value.id ? 'Selected' : 'Select'}
              description={value.description}
              onUpdateClick={() => {onUpdateClick && onUpdateClick(value.id)}}
              onDeleteClick={() => {onDeleteTemplate && onDeleteTemplate(value.id)}}
              onClick={() => {onTemplateClick && onTemplateClick(value)}}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default EmailTemplateList;