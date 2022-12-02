import React, { useEffect, useState } from 'react';
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
import EmailWrap from './Email';
import Email from '@components/organisms/Email';

import ManagerEmployee from './Manager/ManagerEmployee';
import ManagerDepartment from './Manager/ManagerDepartment';
import SettingRoles from './Settings/SettingsRoles';
import EmailMessEmpty from '@components/organisms/EmailMessEmpty';
import EmailCompose from '@components/organisms/EmailCompose';
import Manager from './Manager';

export const managerRouter: RouteObject[] = [
  {
    path: '/manager',
    element: <Manager />,
    children: [
      { path: '/manager', element: <ManagerEmployee /> },
      { path: '/manager/setting', element: <SettingRoles /> },
      {
        path: '/manager/department',
        children: [
          { path: '/manager/department', element: <ManagerDepartment /> },
          { path: '/manager/department/employee', element: <ManagerEmployee /> },
          { path: '/manager/department/department', element: <ManagerDepartment /> },
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
        element: <EmailMessEmpty />,
      },
      {
        path: '/emails/compose',
        element: <EmailCompose />,
      },
      {
        path: '/emails/:status/:email',
        element: <Email />,
      },
    ],
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
