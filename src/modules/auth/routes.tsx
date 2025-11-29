import LoginPage from './pages/login';
import Signup from './pages/signup';
import UnverifyEmailPage from './pages/unverifyEmail';
import VerifyEmailPage from './pages/verifyEmail';

export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Signup /> },
  { path: '/unverify-email', element: <UnverifyEmailPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
];
