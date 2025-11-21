import LoginPage from './pages/login';
import Signup from './pages/signup';

export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <Signup /> },
];
