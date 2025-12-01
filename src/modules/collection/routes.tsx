import Layout from '@/shared/layouts/layout';
import Collections from './pages/collection';
import CollectionDetail from './pages/collectionDetail';
import EditCollection from './pages/editCollection';
import AddCollection from './pages/addCollection';
import ProtectedRoutes from '@/core/router/protectedRoutes';
import PublicCollection from './pages/publicCollection';

export const collectionRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/collections/:id',
        element: <CollectionDetail />,
      },
      {
        path: '/collections/all',
        element: <PublicCollection />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/collections',
            element: <Collections />,
          },
          {
            path: '/collections/create',
            element: <AddCollection />,
          },
          {
            path: '/collections/:id',
            element: <CollectionDetail />,
          },
          {
            path: '/collections/:id/edit',
            element: <EditCollection />,
          },
        ],
      },
    ],
  },
];
