import { flashcardRoutes } from '@/modules/flashcard/routes';
import { authRoutes } from '@/modules/auth/routes';
import { homeRoutes } from '@/modules/home/routes';
import { setRoutes } from '@/set/routes';
import { quizRoutes } from '@/modules/quiz/routes';
import { progressRoutes } from '@/modules/progress/routes';

export const appRoutes = [
  ...authRoutes,
  ...flashcardRoutes,
  ...homeRoutes,
  ...setRoutes,
  ...quizRoutes,
  ...flashcardRoutes,
  ...progressRoutes,
];
