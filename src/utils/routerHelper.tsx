import ErrorBoundary from '@page/ErrorBoudary';
import { IndexRouteObject, NonIndexRouteObject, Navigate } from 'react-router-dom';

export const genCRUD = (
  router: IndexRouteObject | NonIndexRouteObject,
  {
    index,
    add,
    edit,
    detail,
  }: {
    index: JSX.Element;
    add?: JSX.Element;
    edit?: JSX.Element;
    detail?: JSX.Element;
  },
) => {
  if (!router.children) {
    router.children = [{ index: true, element: index }];
    if (edit)
      router.children.push({
        path: 'edit',
        children: [
          { 
            index: true,
            element: <Navigate to={router.path || '../'} />,
          },
          { 
            path: ':id', 
            element: edit,
          },
        ],
      });
    if (add) router.children.push({ path: 'add', element: add });
    if (detail) router.children.push({ path: ':id', element: detail });
    return router;
  }
  return router;
};
