import { contactDummy } from "@assets/dummyData/contact";
import ContactSlideBar from "@components/organisms/ContactSlideBar"
import { Box } from "@mui/system"
import { rem } from "@utils/functions";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

interface ContactLayoutProps {
}

const ContactLayout: React.FC<ContactLayoutProps> = () => {
  const [slideBarExpandIndex, setSlideBarExpandIndex] = useState<number>();
  const [slideBarSelectedMenuItemIndex, setSlideBarSelectedMenuItemIndex] = useState<number>();
  const location = useLocation();
  console.log(location);
  return (
    <Box className="l-contactLayout" display="flex">
      <Box className="l-contactLayout_slideBar" sx={{width: rem(260)}}>
        <ContactSlideBar
          selectedMenuItemIndex={slideBarSelectedMenuItemIndex}
          expandIndex={slideBarExpandIndex}
          title={"Contact"} 
          menuList={contactDummy}
          onMenuTitleClick={(index) => {
            setSlideBarExpandIndex(slideBarExpandIndex === index ? undefined : index);
            setSlideBarSelectedMenuItemIndex(undefined)
          }}
          onMenuItemClick={(index) => setSlideBarSelectedMenuItemIndex(slideBarSelectedMenuItemIndex === index ? undefined : index)}
        />
      </Box>
      <Box className="t-contactLayout_content">
        <Outlet />
      </Box>
    </Box>
  )
}

export default ContactLayout