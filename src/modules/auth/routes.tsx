import LoginPage from './pages/login';
import Signup from './pages/signup';
import UnverifyEmailPage from './pages/unverifyEmail';

export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Signup /> },
  { path: '/unverify-email', element: <UnverifyEmailPage /> },
];
