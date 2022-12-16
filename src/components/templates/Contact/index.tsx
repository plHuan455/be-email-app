import ContactSlideBar, { MenuContactTypes } from "@components/organisms/ContactSlideBar";
import { Box } from "@mui/material";
import { Drawer } from '@mui/material';
import { rem } from "@utils/functions";
interface ContactProps {
  title: string;
  slideBarExpandIndex?: number;
  slideBarSelectedMenuItemIndex?: number;
  contactList: MenuContactTypes[],
  onSlideBarTitleClick: (index: number) => void;
  onSlideBarItemClick: (index: number) => void;
}

const Contact: React.FC<ContactProps> = ({
  title,
  slideBarExpandIndex,
  slideBarSelectedMenuItemIndex,
  contactList,
  onSlideBarTitleClick,
  onSlideBarItemClick,
}) => {
  return (
    <Box className="t-contact">
      <ContactSlideBar
        selectedMenuItemIndex={slideBarSelectedMenuItemIndex}
        expandIndex={slideBarExpandIndex}
        title={title} 
        menuList={contactList}
        onMenuTitleClick={onSlideBarTitleClick}
        onMenuItemClick={onSlideBarItemClick}
      />
    </Box>
  )
}

export default Contact;