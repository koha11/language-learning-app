import Layout from '@/shared/layouts/layout';
import Search from './pages/search';

export const searchRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
];
