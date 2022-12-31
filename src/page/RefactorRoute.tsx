import useInjectLocales from '@hooks/useInjectLocales';
import AuthProvider from '@layouts/Auth/AuthProvider';
import ProtectedRoute from '@layouts/Auth/ProtectedRoute';
import {
  createHashRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import EmailWrap from './Email';
import ErrorBoundary from './ErrorBoudary';
import ErrorPage from './ErrorPage';
import Login from './Login';

import EmailEmptyContainer from '@containers/EmailEmptyContainer';
import ContactLayout from '@layouts/Contact';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import ChangePassword from './ChangePassword';
import ContactGroups from './Contact/ContactGroup';
import EmailComposePage from './Email/EmailComposePage';
import {
  AddMailTemplatePage,
  EditMailTemplatePage,
  MainMailTemplatePage,
} from './MailTemplatePage';
import Manager from './Manager';
import SettingRoles from './Settings/SettingsRoles';
import { AddSignaturePage, EditSignaturePage, SignaturePage } from './SignaturePage';
import UserProfileContainer from './UserProfileContainer';
// import MailTemplateContainer from '@containers/MailTemplateContainer';

import MainWrapperContainer from '@containers/MainWrapperContainer';
import { genCRUD } from '@utils/routerHelper';
import ContactSharingGroupPage from './Contact';
import AddContactGroup from './Contact/ContactGroup/add';
import EditContactGroupPage from './Contact/ContactGroup/edit';
import ContactsPage from './Contact/Contacts';
import AddContactsPage from './Contact/Contacts/add';
import EditContactPage from './Contact/Contacts/edit';
import ContactSharingDepartmentsPage from './Contact/ContactSharingDepartments';
import EditContactSharingGroupsPage from './Contact/ContactSharingGroups/edit';
import ContactSharingPersonalsPage from './Contact/ContactSharingPersonals';
import EditContactSharingPersonalsPage from './Contact/ContactSharingPersonals/edit';
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
import ManagerHashtagsPage from './ManagerHashtagPage';
import ContactPage from './Contact';
import ContactPageParent from './Contact';

export const sideBarRoutes: RouteObject[] = [
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
    path: '/contact',
    element: <ContactPageParent />,
    children: [
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
    path: '/department',
    element: <Manager />,
    children: [
      genCRUD(
        {
          path: '/department/department',
        },
        {
          index: <ManagerDepartmentPage />,
          add: <AddDepartmentPage />,
          edit: <EditDepartmentPage />,
        },
      ),
      genCRUD(
        {
          path: '/department/employee',
        },
        {
          index: <ManagerEmployeePage />,
          add: <AddEmployeePage />,
          edit: <EditEmployeePage />,
        },
      ),
    ],
  },
  {
    path: '/setting',
    element: <Manager />,
    children: [
      { path: '/setting/user-role', element: <SettingRoles /> },
      { path: '/setting/email-infomation', element: <SettingRoles /> },
      { path: '/setting/blacklist', element: <SettingRoles /> },

      genCRUD(
        {
          path: '/setting/email-template',
        },
        {
          index: <MainMailTemplatePage />,
          add: <AddMailTemplatePage />,
          edit: <EditMailTemplatePage />,
        },
      ),
      genCRUD(
        {
          path: '/setting/signature',
        },
        {
          index: <SignaturePage />,
          add: <AddSignaturePage />,
          edit: <EditSignaturePage />,
        },
      ),
    ],
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
        path: '/profile',
        children: [
          {
            index: true,
            path: '/profile',
            element: <UserProfileContainer />,
          },
          {
            path: '/profile/change-password',
            element: <ChangePassword />,
          },
        ],
      },
      ...sideBarRoutes,
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
];

const router = createHashRouter(declareRouter);
function RefactorRoute() {
  const { injected } = useInjectLocales();

  return (
    <AuthProvider>{injected && <RouterProvider router={router} />}</AuthProvider>
  );
}

export default RefactorRoute;
