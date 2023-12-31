import Icon from '@components/atoms/Icon';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ArticleIcon from '@mui/icons-material/Article';
import BlockIcon from '@mui/icons-material/Block';

export interface SubSidebarItem {
  name: string;
  icon?: React.ReactElement;
  navigate?: string;
  menuItems?: any;
}

export const subMenuContact: SubSidebarItem[] = [
  {
    name: 'Contacts',
    icon: <PersonOutlineOutlinedIcon />,
    navigate: '/contact/contacts',
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
    // menuItems: [
    //   {
    //     id: 1,
    //     name: 'Department',
    //     navigate: '/contact/sharing/department',
    //   },
    //   {
    //     id: 2,
    //     name: 'Groups',
    //     navigate: '/contact/sharing/groups',
    //   },
    //   {
    //     id: 3,
    //     name: 'Personals',
    //     navigate: '/contact/sharing/personals',
    //   },
    // ],
  },
];

export const subMenuDepartment: SubSidebarItem[] = [
  {
    name: 'Department',
    icon: <Icon icon="department" color="black" />,
    navigate: '/department',
  },
];

export const subMenuDepartmentManager: SubSidebarItem[] = [
  ...subMenuDepartment,
  {
    name: 'Employee',
    icon: <Icon icon="people" color="black" />,
    navigate: '/employees',
  },
];

export const subMenuSettingUser: SubSidebarItem[] = [
  {
    name: 'User Info',
    icon: <Icon icon="accountCircle" />,
    navigate: '/setting/profile',
  },
  {
    name: 'Email template',
    icon: <ArticleIcon />,
    navigate: '/setting/email-template',
  },
  {
    name: 'Spammer',
    icon: <BlockIcon />,
    navigate: '/setting/spammer',
  },
  {
    name: 'Signature',
    icon: <Icon icon="signature" color="black" />,
    navigate: '/setting/signature',
  },
];

export const subMenuSettingManager: SubSidebarItem[] = [
  {
    name: 'User roles',
    icon: <PersonOutlineOutlinedIcon />,
    navigate: '/setting/user-role',
  },
  ...subMenuSettingUser,
];
