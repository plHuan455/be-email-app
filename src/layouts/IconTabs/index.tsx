import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import DialpadIcon from '@mui/icons-material/Dialpad';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

interface TabItem {
  title: string;
  url?: string;
  icon: React.ReactElement;
}

const TabsData: TabItem[] = [
  {
    title: 'Email',
    icon: <EmailIcon />,
  },
  {
    title: 'Chats',
    icon: <ChatIcon />,
  },
  {
    title: 'Contact',
    icon: <PeopleIcon />,
  },
  {
    title: 'Call',
    icon: <DialpadIcon />,
  },
  {
    title: 'Book Mark',
    icon: <DonutSmallIcon />,
  },
];

const MyTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    display: none;
  }
  & .MuiButtonBase-root {
    padding-block: 24px;
    & .MuiSvgIcon-root {
      position: relative;
      z-index: 1;
    }
    & .MuiTouchRipple-root {
      opacity: 0;
      visibility: hidden;
      transition: 0.4s;
      top: 50%;
      left: 50%;
      bottom: unset;
      right: unset;
      width: 40px;
      height: 40px;
      transform: translate(-50%, -50%);
      border-radius: 8px;
      background: #e9e4ff;
    }
    &.Mui-selected {
      & .MuiTouchRipple-root {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabsData = () =>
    TabsData.map((val, index) => (
      <Tab key={index} icon={val.icon} aria-label={val.title} />
    ));

  return (
    <MyTabs
      value={value}
      orientation="vertical"
      onChange={handleChange}
      aria-label="icon tabs example">
      {renderTabsData()}
    </MyTabs>
  );
}
