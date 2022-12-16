import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { rem } from "@utils/functions";

interface MenuItem {
  id: number;
  name: string;
  email: string;
}

export interface MenuContactTypes {
  name?: string;
  MenuItems: MenuItem[];
}

interface ContactSlideBarProps {
  title: string;
  contactList: MenuContactTypes[]
}

const ContactSlideBar: React.FC<ContactSlideBarProps> = ({
  title,
  contactList,
}) => {
  return (
    <Box className="o-contactSlideBar" padding={rem(24)}>
      <Box className="o-contactSlideBar_title">
        <Typography 
          variant="h2"
          sx={{
            color: '#827CFF',
            fontSize: rem(24),
            fontWeight: 700,
            lineHeight: rem(30),
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box className="o-contactSlideBar_listTitle" mt={rem(24)}>
        <Typography
          variant="h5"
          sx={{
            color: '#000000DE',
            fontSize: rem(16),
            lineHeight: rem(24)
          }}
        >
          My contacts
        </Typography>
      </Box>

      <Box className="o-contactSlideBar_list">
          {contactList.map(value => (
            <Accordion className="o-contactSlideBar_listItem">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{value.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          ))}
      </Box>
    </Box>
  )
}

export default ContactSlideBar