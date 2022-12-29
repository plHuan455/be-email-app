import ProtectedRoute from '@layouts/Auth/ProtectedRoute';
import AuthProvider from '@layouts/Auth/AuthProvider';
import MainWrapper from '@layouts/MainWrapper';
import {
  Navigate,
  RouterProvider,
  RouteObject,
  createHashRouter,
} from 'react-router-dom';
import Login from './Login';
import AboutPage from './About';
import useInjectLocales from '@hooks/useInjectLocales';
import ErrorBoundary from './ErrorBoudary';
import ErrorPage from './ErrorPage';
import EmailWrap from './Email';

import ManagerEmployee from './Manager/ManagerEmployee';
import SettingRoles from './Settings/SettingsRoles';
import Manager from './Manager';
import ChangePassword from './ChangePassword';
import UserProfileContainer from './UserProfileContainer';
import EmailEmptyContainer from '@containers/EmailEmptyContainer';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import EmailComposePage from './Email/EmailComposePage';
import ContactLayout from '@layouts/Contact';
import ContactGroups from './Contact/ContactGroup';
import {
  AddMailTemplatePage,
  EditMailTemplatePage,
  MainMailTemplatePage,
} from './MailTemplatePage';
import { AddSignaturePage, EditSignaturePage, SignaturePage } from './SignaturePage';
// import MailTemplateContainer from '@containers/MailTemplateContainer';

import MainWrapperContainer from '@containers/MainWrapperContainer';
import {
  AddDepartmentPage,
  EditDepartmentPage,
  ManagerDepartmentPage,
} from './Manager/ManagerDepartment';
import ContactsPage from './Contact/Contacts';
import { genCRUD } from '@utils/routerHelper';
import AddContactsPage from './Contact/Contacts/add';
import EditContactPage from './Contact/Contacts/edit';
import AddContactGroup from './Contact/ContactGroup/add';
import EditContactGroupPage from './Contact/ContactGroup/edit';
import ContactSharingGroupPage from './Contact';
import EditContactSharingGroupsPage from './Contact/ContactSharingGroups/edit';
import ContactSharingDepartmentsPage from './Contact/ContactSharingDepartments';
import ContactSharingPersonalsPage from './Contact/ContactSharingPersonals';
import EditContactSharingPersonalsPage from './Contact/ContactSharingPersonals/edit';

export const managerRouter: RouteObject[] = [
  {
    path: '/manager',
    element: <Manager />,
    children: [
      { path: '/manager', element: <ManagerDepartmentPage /> },
      { path: '/manager/setting', element: <SettingRoles /> },
      {
        path: '/manager/department',
        children: [
          {
            index: true,
            path: '/manager/department',
            element: <ManagerDepartmentPage />,
          },
          { path: '/manager/department/add', element: <AddDepartmentPage /> },
          { path: '/manager/department/edit/:id', element: <EditDepartmentPage /> },
          // { path: '/manager/department/employee', element: <ManagerEmployee /> },
          // { path: '/manager/department/department', element: <ManagerDepartment /> },
        ],
      },
      {
        path: '/manager/profile',
        element: <UserProfileContainer />,
      },
      {
        path: '/manager/profile/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/manager/signature',
        // element: <SignaturePage />,
        children: [
          {
            index: true,
            path: '/manager/signature',
            element: <SignaturePage />,
          },
          {
            path: '/manager/signature/add',
            element: <AddSignaturePage />,
          },
          {
            path: '/manager/signature/edit/:id',
            element: <EditSignaturePage />,
          },
        ],
      },
    ],
  },
];

export const sideBarRouter: RouteObject[] = [
  {
    path: '/emails',
    element: <EmailWrap />,
    children: [
      {
        path: '/emails',
        element: <EmailEmptyContainer />,
      },
      {
        path: '/emails/compose',
        element: <EmailComposePage />,
      },
      {
        path: '/emails/catalog/:catalog/:user_id',
        element: <EmailMainWrapper />,
      },
      {
        path: '/emails/catalog/tag/:catalog',
        element: <EmailMainWrapper />,
      },
      {
        path: '/emails/catalog/:catalog',
        element: <EmailEmptyContainer />,
      },
    ],
  },
  {
    path: '/department',
    element: <Navigate to={'/emails'} replace={true} />,
  },
  {
    path: '/setting',
    element: <Navigate to={'/emails'} replace={true} />,
  },
];

export const declareRouter: RouteObject[] = [
  {
    element: <ProtectedRoute children={<MainWrapperContainer />} />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/emails'} replace={true} />,
      },
      {
        path: '/home',
        element: <Navigate to={'/emails'} replace={true} />,
      },
      { path: '/about', element: <AboutPage /> },
      {
        path: '/contact',
        element: <ContactLayout />,
        children: [
          { element: <Navigate to={'/contact/contacts'} />, path: '/contact' },
          genCRUD(
            {
              path: '/contact/contacts',
            },
            {
              index: <ContactsPage />,
              add: <AddContactsPage />,
              edit: <EditContactPage />,
            },
          ),
          genCRUD(
            {
              path: '/contact/sharing/groups',
            },
            {
              index: <ContactSharingGroupPage />,
              edit: <EditContactSharingGroupsPage />,
            },
          ),
          genCRUD(
            {
              path: '/contact/sharing/department',
            },
            {
              index: <ContactSharingDepartmentsPage />,
              edit: <EditContactSharingGroupsPage />,
            },
          ),
          genCRUD(
            {
              path: '/contact/sharing/personals',
            },
            {
              index: <ContactSharingPersonalsPage />,
              edit: <EditContactSharingPersonalsPage />,
            },
          ),
          genCRUD(
            {
              path: '/contact/groups',
            },
            {
              index: <ContactGroups />,
              add: <AddContactGroup />,
              edit: <EditContactGroupPage />,
            },
          ),
        ],
      },
      {
        path: '/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/profile',
        element: <UserProfileContainer />,
      },

      {
        path: '/template',
        children: [
          {
            index: true,
            path: '/template',
            element: <MainMailTemplatePage />,
          },
          {
            path: '/template/add',
            element: <AddMailTemplatePage />,
          },
          {
            path: '/template/edit',
            element: <EditMailTemplatePage />,
          },
        ],
      },
      ...sideBarRouter,
      ...managerRouter,
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/404',
    element: <ErrorPage />,
  },
  //   {
  //     path: '/register',
  //     element: <Register />,
  //   },
];

const router = createHashRouter(declareRouter);
function MainRoute() {
  const { injected } = useInjectLocales();

  return (
    <AuthProvider>{injected && <RouterProvider router={router} />}</AuthProvider>
  );
}

export default MainRoute;
