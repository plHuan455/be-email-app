import { MenuContactTypes } from '@components/organisms/ContactSlideBar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShareIcon from '@mui/icons-material/Share';

export const contactDummy: MenuContactTypes[] = [
  {
    name: 'Contacts',
    icon: <PersonOutlineOutlinedIcon />,
    navigate: '/contact/contacts',
    // menuItems: [
    //   {name: 'test', id: 1, navigate: '/contact/sharing'},
    //   {name: 'test 1', id: 1, navigate: '/contact/sharing'},
    //   {name: 'test 2', id: 1, navigate: '/contact/sharing'},
    // ]
  },
  {
    name: 'Sharing',
    icon: <ShareIcon />,
    menuItems: [
      {
        id: 1,
        name: 'Department',
        navigate: '/contact/sharing/department',
      },
      {
        id: 2,
        name: 'Groups',
        navigate: '/contact/sharing/groups',
      },
      {
        id: 3,
        name: 'Personals',
        navigate: '/contact/sharing/personals',
      },
    ],
  },
  {
    name: 'Groups',
    icon: <PersonOutlineOutlinedIcon />,
    navigate: '/contact/groups',
  },
];
