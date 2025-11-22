import Layout from '@/shared/layouts/layout';
import Quiz from './pages/quiz';
import ProtectedRoutes from '@/core/router/protectedRoutes';

export const quizRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/collections/:id/quiz',
            element: <Quiz />,
          },
        ],
      },
    ],
  },
];
