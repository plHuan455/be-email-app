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
import ManagerDepartment from './Manager/ManagerDepartment';
import SettingRoles from './Settings/SettingsRoles';
import Manager from './Manager';
import ChangePassword from './ChangePassword';
import UserProfileContainer from './UserProfileContainer';
import EmailEmptyContainer from '@containers/EmailEmptyContainer';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import EmailComposePage from './Email/EmailComposePage';
import ContactLayout from '@layouts/Contact';
import ContactSharing from './Contact/ContactSharing';
import ContactGroups from './Contact/ContactGroup';
import SignaturePage from './SignaturePage';

export const managerRouter: RouteObject[] = [
  {
    path: '/manager',
    element: <Manager />,
    children: [
      { path: '/manager', element: <ManagerDepartment /> },
      { path: '/manager/setting', element: <SettingRoles /> },
      {
        path: '/manager/department',
        children: [
          { path: '/manager/department', element: <ManagerDepartment /> },
          { path: '/manager/department/employee', element: <ManagerEmployee /> },
          { path: '/manager/department/department', element: <ManagerDepartment /> },
        ],
      },
      {
        path: '/manager/profile',
        element: <UserProfileContainer />,
      },
      {
        path: '/manager/change-password',
        element: <ChangePassword />,
      },
      {
        path: '/manager/signature',
        element: <SignaturePage />,
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
    element: <ProtectedRoute children={<MainWrapper />} />,
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
          {
            path: '/contact/sharing',
            element: <ContactSharing />,
          },
          {
            path: '/contact/groups',
            element: <ContactGroups />,
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
