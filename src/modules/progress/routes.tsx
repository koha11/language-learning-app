import Layout from '@/shared/layouts/layout';
import Progress from './pages/progress';

export const progressRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/progress',
        element: <Progress />,
      },
    ],
  },
];
