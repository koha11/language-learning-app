import Layout from '@/shared/layouts/layout';
import Flashcards from './pages/flashcard';

export const flashcardRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/flashcard',
        element: <Flashcards />,
      },
    ],
  },
];
