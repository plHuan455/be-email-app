import { MenuContactTypes } from "@components/organisms/ContactSlideBar";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShareIcon from '@mui/icons-material/Share';

export const contactDummy: MenuContactTypes[] = [
  {
    name: 'Contacts',
    icon: <PersonOutlineOutlinedIcon />,
    menuItems: [
      {name: 'test', id: 1, navigate: '/contact/sharing'},
      {name: 'test 1', id: 1, navigate: '/contact/sharing'},
      {name: 'test 2', id: 1, navigate: '/contact/sharing'},
    ]
  },
  {
    name: 'Sharing',
    navigate: '/contact/sharing',
    icon: <ShareIcon />
  },
  {
    name: 'Groups',
    icon: <PersonOutlineOutlinedIcon />,
    navigate: '/contact/groups'
  },
]