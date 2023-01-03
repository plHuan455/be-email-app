import useInjectLocales from '@hooks/useInjectLocales';
import AuthProvider from '@layouts/Auth/AuthProvider';
import ProtectedRoute from '@layouts/Auth/ProtectedRoute';
import {
  createHashRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import AboutPage from './About';
import EmailWrap from './Email';
import ErrorBoundary from './ErrorBoudary';
import ErrorPage from './ErrorPage';
import Login from './Login';

import EmailEmptyContainer from '@containers/EmailEmptyContainer';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import ChangePassword from './ChangePassword';
import ContactGroups from './Contact/ContactGroup';
import EmailComposePage from './Email/EmailComposePage';
import Manager from './Manager';
import {
  AddEmailTemplatePage,
  EditEmailTemplatePage,
  EmailTemplatePage,
} from './Settings/EmailTemplate';
import SettingRoles from './Settings/Roles';
import {
  AddSignaturePage,
  EditSignaturePage,
  SignaturePage,
} from './Settings/Signature';
import UserProfileContainer from './UserProfileContainer';
// import MailTemplateContainer from '@containers/MailTemplateContainer';

import MainWrapperContainer from '@containers/MainWrapperContainer';
import { genCRUD } from '@utils/routerHelper';
import ContactsPage from './Contact/Contacts';
import AddContactsPage from './Contact/Contacts/add';
import EditContactPage from './Contact/Contacts/edit';
import {
  AddDepartmentPage,
  EditDepartmentPage,
  ManagerDepartmentPage,
} from './Manager/ManagerDepartment';
import {
  AddEmployeePage,
  EditEmployeePage,
  ManagerEmployeePage,
} from './Manager/ManagerEmployee';

import ContactSharingGroupPage from './Contact';
import AddContactGroup from './Contact/ContactGroup/add';
import EditContactGroupPage from './Contact/ContactGroup/edit';
import ContactSharingDepartmentsPage from './Contact/ContactSharingDepartments';
import EditContactSharingGroupsPage from './Contact/ContactSharingGroups/edit';
import ContactSharingPersonalsPage from './Contact/ContactSharingPersonals';
import EditContactSharingPersonalsPage from './Contact/ContactSharingPersonals/edit';
import ManagerHashtagsPage from './ManagerHashtagPage';
import BlackListPage from './Settings/BlackList';

export const managerRouter: RouteObject[] = [
  {
    path: '/manager',
    element: <Manager />,
    children: [
      // { path: '/manager', element: <ManagerDepartmentPage /> },
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
          {
            path: '/manager/department/:id/employee',
            element: <ManagerEmployeePage />,
          },
          {
            path: '/manager/department/:id/employee/add',
            element: <AddEmployeePage />,
          },
          {
            path: '/manager/department/:id/employee/edit/:employee_id',
            element: <EditEmployeePage />,
          },
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
      {
        path: '/manager/hashtags',
        element: <ManagerHashtagsPage />,
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
        // element: <ContactLayout />,
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
            element: <EmailTemplatePage />,
          },
          {
            path: '/template/add',
            element: <AddEmailTemplatePage />,
          },
          {
            path: '/template/edit',
            element: <EditEmailTemplatePage />,
          },
        ],
      },
      {
        path: '/black-list',
        element: <BlackListPage />,
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
