import React, { useEffect } from 'react';
import ProtectedRoute from '@layouts/Auth/ProtectedRoute';
import AuthProvider from '@layouts/Auth/AuthProvider';
import MainWrapper from '@layouts/MainWrapper';
import {
  Navigate,
  RouterProvider,
  RouteObject,
  createHashRouter,
} from 'react-router-dom';
import HomePage from './Home';
import Login from './Login';
import AboutPage from './About';
import useInjectLocales from '@hooks/useInjectLocales';
import { genCRUD } from '@utils/routerHelper';
import ErrorBoundary from './ErrorBoudary';
import ErrorPage from './ErrorPage';
import EmailHashTag from './Email/EmailHashTag';
import Email from './Email';
import ManagerEmployee from './Manager/ManagerEmployee';
import ManagerSettings from './Manager/ManagerSettings';
import ManagerDepartment from './Manager/ManagerDepartment';
export const sideBarRouter: RouteObject[] = [
  {
    path: '/emails',
    element: <Email />,
  },
  {
    path: '/chats',
    element: <HomePage />,
  },
  {
    path: '/contact',
    element: <HomePage />,
  },
  {
    path: '/call',
    element: <HomePage />,
  },
  {
    path: '/bookmark',
    element: <HomePage />,
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
        path: '/manager',
        children: [
          { path: '/manager/employee', element: <ManagerEmployee /> },
          { path: '/manager/department', element: <ManagerDepartment /> },
          { path: '/manager/setting', element: <ManagerSettings /> },
        ],
      },
      ...sideBarRouter,
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
