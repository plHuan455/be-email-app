import EmailTemplateCard from "@components/organisms/EmailTemplateCard";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system"
import { rem } from "@utils/functions";

export interface EmailTemplateItem {
  id: number;
  name: string;
  description: string;
  imgSrc: string;
}

interface EmailTemplateListProps {
  emailTemplateList: EmailTemplateItem[];
}

const EmailTemplateList: React.FC<EmailTemplateListProps> = ({
  emailTemplateList
}) => {
  const theme = useTheme();
  return (
    <Box 
      className="t-emailTemplateList px-6" 
    >
      <Box>
        <Typography sx={{color: '#0D1216', fontSize: rem(24), fontWeight: 600}}>Recent templates</Typography>
      </Box>
      <Box 
        display="flex"
        sx={{margin: rem(-12), mt: rem(-4), flexWrap: 'wrap'}}
      >
        {emailTemplateList.map(value => (
          <Box
            sx={{ 
              flexBasis: 'calc(100% / 3)', 
              padding: rem(12),
              [theme.breakpoints.up('md')]: {
                flexBasis: 'calc(100% / 5)', 
              }
            }}
            key={value.id}
          >
            <EmailTemplateCard
              src={value.imgSrc}
              name={value.name}
              description={value.description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default EmailTemplateList;