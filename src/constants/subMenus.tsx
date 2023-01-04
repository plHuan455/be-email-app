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
];

export const subMenuDepartment: SubSidebarItem[] = [
  {
    name: 'Department',
    icon: <Icon icon="department" color="black" />,
    navigate: '/department/department',
  },
];

export const subMenuSetting: SubSidebarItem[] = [
  {
    name: 'User roles',
    icon: <PersonOutlineOutlinedIcon />,
    navigate: '/setting/user-role',
  },
  {
    name: 'Email information',
    icon: <Icon icon="accountCircle" />,
    navigate: '/setting/email-infomation',
  },
  {
    name: 'Email template',
    icon: <ArticleIcon />,
    navigate: '/setting/email-template',
  },
  {
    name: 'Blacklist',
    icon: <BlockIcon />,
    navigate: '/setting/blacklist',
  },
  {
    name: 'Signature',
    icon: <Icon icon="signature" color="black" />,
    navigate: '/setting/signature',
  },
];
