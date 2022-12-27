import { contactDummy } from '@assets/dummyData/contact';
import ContactSlideBar from '@components/organisms/ContactSlideBar';
import React, { useState } from 'react';

const ContactSidebarContainer = () => {
  const [slideBarExpandIndex, setSlideBarExpandIndex] = useState<number>();
  const [slideBarSelectedMenuItemIndex, setSlideBarSelectedMenuItemIndex] =
    useState<number>();

  return (
    <ContactSlideBar
      selectedMenuItemIndex={slideBarSelectedMenuItemIndex}
      expandIndex={slideBarExpandIndex}
      title={'Contact'}
      menuList={contactDummy}
      onMenuTitleClick={(index) => {
        setSlideBarExpandIndex(slideBarExpandIndex === index ? undefined : index);
        setSlideBarSelectedMenuItemIndex(undefined);
      }}
      onMenuItemClick={(index) =>
        setSlideBarSelectedMenuItemIndex(
          slideBarSelectedMenuItemIndex === index ? undefined : index,
        )
      }
    />
  );
};

export default ContactSidebarContainer;
