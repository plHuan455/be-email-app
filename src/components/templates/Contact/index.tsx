import ContactSlideBar, { MenuContactTypes } from "@components/organisms/ContactSlideBar";
import { Box } from "@mui/material";

interface ContactProps {
  title: string;
  contactList: MenuContactTypes[]
}

const Contact: React.FC<ContactProps> = ({
  title,
  contactList,
}) => {
  return (
    <Box className="t-contact">
      <ContactSlideBar 
        title={title} 
        contactList={contactList}
      />
    </Box>
  )
}

export default Contact;