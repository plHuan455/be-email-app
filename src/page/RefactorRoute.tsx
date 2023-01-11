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
import {
  default as ContactPageParent,
  default as ContactSharingGroupPage,
} from './Contact';
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
import {
  AddEmailInformationPage,
  EditEmailInformationPage,
  EmailInformationPage,
} from './Settings/EmailInformation';
import SettingPage from './Settings';
import BlackListPage from './Settings/BlackList';
import {
  AddPositionPage,
  EditPositionPage,
  ManagerPositionPage,
} from './Manager/ManagerPositionPage';
import ContactSharingGroupsPage from './Contact/ContactSharingGroups';

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
          index: <ContactSharingGroupsPage />,
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
    path: '/departments',
    element: <Manager />,
    children: [
      genCRUD(
        {
          path: '/departments/department',
        },
        {
          index: <ManagerDepartmentPage />,
          add: <AddDepartmentPage />,
          edit: <EditDepartmentPage />,
        },
      ),
      genCRUD(
        {
          path: '/departments/department/:idDepartment/employee',
        },
        {
          index: <ManagerEmployeePage />,
          add: <AddEmployeePage />,
          edit: <EditEmployeePage />,
        },
      ),
      genCRUD(
        {
          path: '/departments/department/:idDepartment/position',
        },
        {
          index: <ManagerPositionPage />,
          add: <AddPositionPage />,
          edit: <EditPositionPage />,
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
      ...sideBarRoutes,
      {
        path: '/setting',
        element: <SettingPage />,
        children: [
          { path: '/setting/user-role', element: <SettingRoles /> },
          { path: '/setting/blacklist', element: <BlackListPage /> },
          {
            path: '/setting/profile',
            children: [
              {
                index: true,
                path: '/setting/profile',
                element: <UserProfileContainer />,
              },
              {
                path: '/setting/profile/change-password',
                element: <ChangePassword />,
              },
            ],
          },
          genCRUD(
            {
              path: '/setting/email-infomation',
            },
            {
              index: <EmailInformationPage />,
              add: <AddEmailInformationPage />,
              edit: <EditEmailInformationPage />,
            },
          ),
          genCRUD(
            {
              path: '/setting/email-template',
            },
            {
              index: <EmailTemplatePage />,
              add: <AddEmailTemplatePage />,
              edit: <EditEmailTemplatePage />,
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
