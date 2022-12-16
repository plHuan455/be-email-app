import { contactDummy } from "@assets/dummyData/contact";
import Contact from "@components/templates/Contact";
import { useState } from "react";

interface ContactContainerProps {
}

const ContactContainer:React.FC<ContactContainerProps> = () => {
  const [slideBarExpandIndex, setSlideBarExpandIndex] = useState<number>();
  const [slideBarSelectedMenuItemIndex, setSlideBarSelectedMenuItemIndex] = useState<number>();
  return (
    <>
      <Contact
        slideBarExpandIndex={slideBarExpandIndex}
        title="Contact"
        contactList={contactDummy}
        slideBarSelectedMenuItemIndex={slideBarSelectedMenuItemIndex}
        onSlideBarTitleClick={(index) => {
          setSlideBarExpandIndex(slideBarExpandIndex === index ? undefined : index);
          setSlideBarSelectedMenuItemIndex(undefined)
        }}
        onSlideBarItemClick={(index) => setSlideBarSelectedMenuItemIndex(slideBarSelectedMenuItemIndex === index ? undefined : index)}
      />
    </>
  )
}

export default ContactContainer;